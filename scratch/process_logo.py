import zlib
import struct

def process_png_transparency(input_path, output_path, white_threshold=235):
    with open(input_path, 'rb') as f:
        data = f.read()

    assert data[:8] == b'\x89PNG\r\n\x1a\n', "Invalid PNG"

    pos = 8
    width = height = bit_depth = color_type = 0
    idat_chunks = []

    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        chunk_type = data[pos+4:pos+8]
        chunk_data = data[pos+8:pos+8+length]
        pos += 12 + length

        if chunk_type == b'IHDR':
            width, height, bit_depth, color_type = struct.unpack('>IIBB', chunk_data[:10])
        elif chunk_type == b'IDAT':
            idat_chunks.append(chunk_data)

    decompressed = zlib.decompress(b''.join(idat_chunks))
    
    bytes_per_pixel = 4 if color_type == 6 else (3 if color_type == 2 else 4)
    stride = 1 + width * bytes_per_pixel
    
    # Reconstruct raw pixels (handling PNG filter types)
    raw_rows = []
    prev_row = bytearray(width * 4)
    
    decomp_pos = 0
    for y in range(height):
        filter_type = decompressed[decomp_pos]
        decomp_pos += 1
        row_bytes = bytearray(decompressed[decomp_pos:decomp_pos + width * bytes_per_pixel])
        decomp_pos += width * bytes_per_pixel
        
        # Unfilter row
        current_rgba = bytearray(width * 4)
        for x in range(width):
            if bytes_per_pixel == 4:
                r = row_bytes[x * 4]
                g = row_bytes[x * 4 + 1]
                b = row_bytes[x * 4 + 2]
                a = row_bytes[x * 4 + 3]
            else:
                r = row_bytes[x * 3]
                g = row_bytes[x * 3 + 1]
                b = row_bytes[x * 3 + 2]
                a = 255

            if filter_type == 1: # Sub
                if x > 0:
                    r = (r + current_rgba[(x-1)*4]) & 0xFF
                    g = (g + current_rgba[(x-1)*4+1]) & 0xFF
                    b = (b + current_rgba[(x-1)*4+2]) & 0xFF
                    a = (a + current_rgba[(x-1)*4+3]) & 0xFF
            elif filter_type == 2: # Up
                r = (r + prev_row[x*4]) & 0xFF
                g = (g + prev_row[x*4+1]) & 0xFF
                b = (b + prev_row[x*4+2]) & 0xFF
                a = (a + prev_row[x*4+3]) & 0xFF
            elif filter_type == 3: # Average
                left_r = current_rgba[(x-1)*4] if x > 0 else 0
                left_g = current_rgba[(x-1)*4+1] if x > 0 else 0
                left_b = current_rgba[(x-1)*4+2] if x > 0 else 0
                left_a = current_rgba[(x-1)*4+3] if x > 0 else 0
                
                up_r = prev_row[x*4]
                up_g = prev_row[x*4+1]
                up_b = prev_row[x*4+2]
                up_a = prev_row[x*4+3]
                
                r = (r + ((left_r + up_r) // 2)) & 0xFF
                g = (g + ((left_g + up_g) // 2)) & 0xFF
                b = (b + ((left_b + up_b) // 2)) & 0xFF
                a = (a + ((left_a + up_a) // 2)) & 0xFF
            elif filter_type == 4: # Paeth
                left_r = current_rgba[(x-1)*4] if x > 0 else 0
                left_g = current_rgba[(x-1)*4+1] if x > 0 else 0
                left_b = current_rgba[(x-1)*4+2] if x > 0 else 0
                left_a = current_rgba[(x-1)*4+3] if x > 0 else 0
                
                up_r = prev_row[x*4]
                up_g = prev_row[x*4+1]
                up_b = prev_row[x*4+2]
                up_a = prev_row[x*4+3]
                
                upleft_r = prev_row[(x-1)*4] if x > 0 else 0
                upleft_g = prev_row[(x-1)*4+1] if x > 0 else 0
                upleft_b = prev_row[(x-1)*4+2] if x > 0 else 0
                upleft_a = prev_row[(x-1)*4+3] if x > 0 else 0
                
                def paeth(a, b, c):
                    p = a + b - c
                    pa = abs(p - a)
                    pb = abs(p - b)
                    pc = abs(p - c)
                    if pa <= pb and pa <= pc: return a
                    elif pb <= pc: return b
                    else: return c
                
                r = (r + paeth(left_r, up_r, upleft_r)) & 0xFF
                g = (g + paeth(left_g, up_g, upleft_g)) & 0xFF
                b = (b + paeth(left_b, up_b, upleft_b)) & 0xFF
                a = (a + paeth(left_a, up_a, upleft_a)) & 0xFF

            # Make white & near-white transparent with smooth feathering
            brightness = (r + g + b) / 3.0
            
            # If color is near white:
            if r > 240 and g > 240 and b > 240:
                a = 0
            elif r > 220 and g > 220 and b > 220:
                # Feather alpha linearly
                factor = (255 - max(r, g, b)) / 35.0
                a = int(min(255, max(0, factor * 255)))
            
            current_rgba[x*4] = r
            current_rgba[x*4+1] = g
            current_rgba[x*4+2] = b
            current_rgba[x*4+3] = a

        raw_rows.append(current_rgba)
        prev_row = current_rgba

    # Create new filtered PNG data (Filter type 0: None for simplicity & max quality)
    new_decompressed = bytearray()
    for row in raw_rows:
        new_decompressed.append(0) # filter type 0
        new_decompressed.extend(row)

    compressed_idat = zlib.compress(bytes(new_decompressed), level=9)

    def make_chunk(chunk_type, chunk_data):
        length = struct.pack('>I', len(chunk_data))
        crc = struct.pack('>I', zlib.crc32(chunk_type + chunk_data) & 0xFFFFFFFF)
        return length + chunk_type + chunk_data + crc

    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    
    png_out = bytearray(b'\x89PNG\r\n\x1a\n')
    png_out.extend(make_chunk(b'IHDR', ihdr_data))
    png_out.extend(make_chunk(b'IDAT', compressed_idat))
    png_out.extend(make_chunk(b'IEND', b''))

    with open(output_path, 'wb') as f:
        f.write(png_out)
    
    print(f"Successfully processed {input_path} -> {output_path} ({width}x{height} transparent PNG)")

process_png_transparency('client/public/logo-full.png', 'client/public/logo-full.png')
process_png_transparency('client/public/logo.png', 'client/public/logo.png')
process_png_transparency('client/public/logo-icon.png', 'client/public/logo-icon.png')

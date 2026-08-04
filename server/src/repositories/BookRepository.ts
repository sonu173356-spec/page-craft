import { IBook } from '../interfaces/IBook';
import { IRepository } from '../interfaces/IRepository';
import { books } from '../data/books';

export class BookRepository implements IRepository<IBook> {
    private data: IBook[] = books;
    async findAll(): Promise<IBook[]> { return this.data; }
    async findById(id: string): Promise<IBook | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IBook> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IBook | null> {
        const index = this.data.findIndex(i => i.id === id);
        if (index === -1) return null;
        this.data[index] = { ...this.data[index], ...item };
        return this.data[index];
    }
    async delete(id: string): Promise<boolean> {
        const index = this.data.findIndex(i => i.id === id);
        if (index === -1) return false;
        this.data.splice(index, 1);
        return true;
    }
}

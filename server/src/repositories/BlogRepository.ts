import { IBlog } from '../interfaces/IBlog';
import { IRepository } from '../interfaces/IRepository';
import { blogs } from '../data/blogs';

export class BlogRepository implements IRepository<IBlog> {
    private data: IBlog[] = blogs;
    async findAll(): Promise<IBlog[]> { return this.data; }
    async findById(id: string): Promise<IBlog | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IBlog> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IBlog | null> {
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

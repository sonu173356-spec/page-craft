import { IAuthor } from '../interfaces/IAuthor';
import { IRepository } from '../interfaces/IRepository';
import { authors } from '../data/authors';

export class AuthorRepository implements IRepository<IAuthor> {
    private data: IAuthor[] = authors;
    async findAll(): Promise<IAuthor[]> { return this.data; }
    async findById(id: string): Promise<IAuthor | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IAuthor> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IAuthor | null> {
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

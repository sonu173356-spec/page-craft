import { IUser } from '../interfaces/IUser';
import { IRepository } from '../interfaces/IRepository';
import { users } from '../data/users';

export class UserRepository implements IRepository<IUser> {
    private data: IUser[] = users;
    async findAll(): Promise<IUser[]> { return this.data; }
    async findById(id: string): Promise<IUser | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IUser> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IUser | null> {
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

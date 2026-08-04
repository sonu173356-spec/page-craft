import { IReview } from '../interfaces/IReview';
import { IRepository } from '../interfaces/IRepository';
import { reviews } from '../data/reviews';

export class ReviewRepository implements IRepository<IReview> {
    private data: IReview[] = reviews;
    async findAll(): Promise<IReview[]> { return this.data; }
    async findById(id: string): Promise<IReview | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IReview> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IReview | null> {
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

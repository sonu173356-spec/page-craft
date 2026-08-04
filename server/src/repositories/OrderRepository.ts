import { IOrder } from '../interfaces/IOrder';
import { IRepository } from '../interfaces/IRepository';
import { orders } from '../data/orders';

export class OrderRepository implements IRepository<IOrder> {
    private data: IOrder[] = orders;
    async findAll(): Promise<IOrder[]> { return this.data; }
    async findById(id: string): Promise<IOrder | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<IOrder> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<IOrder | null> {
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

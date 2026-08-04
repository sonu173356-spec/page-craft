const fs = require('fs');
const path = require('path');

const root = __dirname;

const write = (filepath, content) => {
    const fullpath = path.join(root, filepath);
    fs.mkdirSync(path.dirname(fullpath), { recursive: true });
    fs.writeFileSync(fullpath, content.trim() + '\n');
};

write('tsconfig.json', `{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}`);

write('.env.example', `
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=1d
`);

write('src/config/index.ts', `
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    }
};
`);

write('src/config/database.ts', `
export interface IDatabaseConfig {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
`);

// Interfaces
const interfaces = [
    'IBook.ts', 'IAuthor.ts', 'IUser.ts', 'IOrder.ts', 'IBlog.ts', 'IReview.ts', 
    'ICoupon.ts', 'INewsletter.ts', 'IContact.ts'
];
interfaces.forEach(i => {
    write(`src/interfaces/${i}`, `export interface ${i.replace('.ts', '')} { id: string; [key: string]: any; }`);
});

write('src/interfaces/IRepository.ts', `
export interface IRepository<T> {
    findAll(query?: any): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(item: Omit<T, 'id'>): Promise<T>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
`);

// Mock Data
write('src/data/books.ts', `export const books = [{ id: '1', title: 'The Great Mock Book', authorId: '1', price: 29.99, category: 'Fiction', isbn: '978-3-16-148410-0' }];`);
write('src/data/authors.ts', `export const authors = [{ id: '1', name: 'John Doe', bio: 'A great author.' }];`);
write('src/data/users.ts', `export const users = [{ id: '1', name: 'Admin User', email: 'admin@pagecraft.com', role: 'admin', password: 'hashedpassword' }];`);
write('src/data/orders.ts', `export const orders = [];`);
write('src/data/blogs.ts', `export const blogs = [];`);
write('src/data/reviews.ts', `export const reviews = [];`);
write('src/data/categories.ts', `export const categories = [];`);
write('src/data/coupons.ts', `export const coupons = [];`);
write('src/data/plans.ts', `export const plans = [];`);
write('src/data/faqs.ts', `export const faqs = [];`);
write('src/data/careers.ts', `export const careers = [];`);
write('src/data/services.ts', `export const services = [];`);

// Repositories
const repos = [
    { name: 'Book', data: 'books' },
    { name: 'Author', data: 'authors' },
    { name: 'User', data: 'users' },
    { name: 'Order', data: 'orders' },
    { name: 'Blog', data: 'blogs' },
    { name: 'Review', data: 'reviews' }
];

repos.forEach(repo => {
    write(`src/repositories/${repo.name}Repository.ts`, `
import { I${repo.name} } from '../interfaces/I${repo.name}';
import { IRepository } from '../interfaces/IRepository';
import { ${repo.data} } from '../data/${repo.data}';

export class ${repo.name}Repository implements IRepository<I${repo.name}> {
    private data: I${repo.name}[] = ${repo.data};
    async findAll(): Promise<I${repo.name}[]> { return this.data; }
    async findById(id: string): Promise<I${repo.name} | null> { return this.data.find(i => i.id === id) || null; }
    async create(item: any): Promise<I${repo.name}> { 
        const newItem = { id: String(this.data.length + 1), ...item };
        this.data.push(newItem);
        return newItem;
    }
    async update(id: string, item: any): Promise<I${repo.name} | null> {
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
`);
});

// Services
const services = ['Book', 'Auth', 'Author', 'Order', 'Blog', 'Review', 'Dashboard', 'Newsletter', 'Contact'];
services.forEach(s => {
    write(`src/services/${s}Service.ts`, `
export class ${s}Service {
    // implementation
}
`);
});

// Utils
write('src/utils/ApiError.ts', `
export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}
`);
write('src/utils/ApiResponse.ts', `
export class ApiResponse<T> {
    constructor(public statusCode: number, public data: T, public message: string = 'Success') {}
}
`);

// Middleware
write('src/middleware/errorHandler.ts', `
import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
};
`);

write('src/middleware/auth.ts', `
import { Request, Response, NextFunction } from 'express';
export const auth = (roles: string[] = []) => (req: Request, res: Response, next: NextFunction) => {
    // auth mock
    next();
};
`);

// Controllers
const controllers = ['book', 'auth', 'author', 'order', 'blog', 'review', 'dashboard', 'newsletter', 'contact', 'coupon', 'plan', 'faq', 'career'];
controllers.forEach(c => {
    write(`src/controllers/${c}Controller.ts`, `
import { Request, Response, NextFunction } from 'express';
export const ${c}Controller = {
    getAll: (req: Request, res: Response) => res.json({ message: 'get all' }),
    getById: (req: Request, res: Response) => res.json({ message: 'get by id' }),
    create: (req: Request, res: Response) => res.json({ message: 'create' }),
    update: (req: Request, res: Response) => res.json({ message: 'update' }),
    delete: (req: Request, res: Response) => res.json({ message: 'delete' }),
};
`);
});

// Routes
controllers.forEach(c => {
    write(`src/routes/v1/${c}Routes.ts`, `
import { Router } from 'express';
import { ${c}Controller } from '../../controllers/${c}Controller';
const router = Router();
router.get('/', ${c}Controller.getAll);
router.get('/:id', ${c}Controller.getById);
router.post('/', ${c}Controller.create);
router.put('/:id', ${c}Controller.update);
router.delete('/:id', ${c}Controller.delete);
export default router;
`);
});

write('src/routes/v1/index.ts', `
import { Router } from 'express';
${controllers.map(c => `import ${c}Routes from './${c}Routes';`).join('\n')}

const router = Router();
${controllers.map(c => `router.use('/${c === 'auth' ? 'auth' : c + 's'}', ${c}Routes);`).join('\n')}

export default router;
`);

// App & Server
write('src/app.ts', `
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import v1Routes from './routes/v1';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', v1Routes);

app.use(errorHandler);

export default app;
`);

write('src/server.ts', `
import app from './app';
import { config } from './config';

app.listen(config.port, () => {
    console.log(\`Server running on port \${config.port}\`);
});
`);

console.log('Project structure generated.');

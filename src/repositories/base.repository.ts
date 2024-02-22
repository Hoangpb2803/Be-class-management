import { Document, Model } from "mongoose";

export class BaseRepository<T extends Document> {
    constructor(
        private model: Model<T>
    ) { }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findOne(_id: string): Promise<T> {
        return this.model.findById(_id).exec();
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async update(_id: string, data: Partial<T>): Promise<T> {
        return this.model.findByIdAndUpdate(_id, data, { new: true }).exec();
    }

    async delete(_id: string): Promise<T> {
        return this.model.findByIdAndDelete(_id).exec();
    }
}
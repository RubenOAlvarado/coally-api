import mongoose, { Schema, Document } from "mongoose";

export interface ITaskDocument extends Document {
    title: string;
    description: string;
    isCompleted: boolean;
}

const TaskSchema: Schema = new Schema<ITaskDocument>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    isCompleted: { type: Boolean, required: false, default: false }
}, { timestamps: true });

export const TaskModel = mongoose.model<ITaskDocument>("Tasks", TaskSchema);
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'completed', 'cancelled'],
    default: 'planning',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  startDate: { type: Date },
  endDate: { type: Date },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  developersIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Project', projectSchema);

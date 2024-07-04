import { model, Schema } from 'mongoose';

const Contact = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },

    phoneNumber: {
      type: String,
      required: [true, 'Set phone number for contact'],
    },

    email: {
      type: String,
      optional: true,
      unique: true,
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'personal', 'home'],
      default: 'personal',
    },
    parentId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ContactsCollection = model('contacts', Contact);

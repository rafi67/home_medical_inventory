"use client";

import { CATEGORIES, Medicine } from "@/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface AddMedicineModalProps {
    isOpen: boolean
    onClose: () => void
    onAdd: (medicine: Omit<Medicine, 'id'>) => void
}

const AddMedicineModal = ({ isOpen, onClose, onAdd }: AddMedicineModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        quantity: 1,
        unit: 'tablets',
        expiryDate: '',
        category: CATEGORIES[0],
        notes: '',
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd(formData)
        setFormData({
            name: '',
            dosage: '',
            quantity: 1,
            unit: 'tablets',
            expiryDate: '',
            category: CATEGORIES[0],
            notes: '',
        })
        onClose()
    }
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Medicine</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Medicine Name *</Label>
                        <Input
                            id="name"
                            required
                            placeholder="e.g. Ibuprofen"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dosage">Dosage</Label>
                            <Input
                                id="dosage"
                                placeholder="e.g. 200mg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                                id="quantity"
                                required
                                type="number"
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <select
                                id="unit"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="tablets">Tablets</option>
                                <option value="capsules">Capsules</option>
                                <option value="ml">ml</option>
                                <option value="drops">Drops</option>
                                <option value="pieces">Pieces</option>
                                <option value="tubes">Tubes</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                            id="expiryDate"
                            required
                            type="date"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <textarea
                            id="notes"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="e.g. Take with food"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                            Add Medicine
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMedicineModal;
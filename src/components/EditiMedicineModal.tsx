/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Medicine } from "@/types";
import { updateMedicines } from "@/services/medicines/updateMedicine";

interface AddMedicineModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: any;
    medicine: Medicine;
}

const EditMedicineModal = ({ isOpen, onClose, categories, medicine }: AddMedicineModalProps) => {

    const [state, formAction, isPending] = useActionState(updateMedicines, null);
    const dateObj = new Date(medicine?.expiryDate);

    const mm = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const yyyy = dateObj.getFullYear();

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        } else if (state && state.success) {
            toast.success('Added Successfully!');
            onClose();
        }
    }, [state, onClose]);


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Medicine</DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4 py-4">
                    <Input
                        id="_id"
                        required
                        name="_id"
                        type="hidden"
                        defaultValue={medicine?._id}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="name">Medicine Name *</Label>
                        <Input
                            id="name"
                            required
                            name="name"
                            placeholder="e.g. Ibuprofen"
                            defaultValue={medicine?.name}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dosage">Dosage</Label>
                            <Input
                                id="dosage"
                                name="dosage"
                                placeholder="e.g. 200mg"
                                defaultValue={medicine?.dosage}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                name="category"
                                defaultValue={medicine?.category?._id}
                            >
                                {categories?.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Current Quantity *</Label>
                            <Input
                                id="quantity"
                                required
                                min="0"
                                name="currentQuantity"
                                defaultValue={medicine?.currentQuantity}
                            />
                        </div>
                       <div className="space-y-2">
                            <Label htmlFor="quantity">Fixed Quantity *</Label>
                             <Input
                                id="quantity"
                                required
                                min="0"
                                name="fixedQuantity"
                                defaultValue={medicine?.fixedQuantity}
                            />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit</Label>
                            <select
                                id="unit"
                                name="unit"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                defaultValue={medicine?.unit}
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
                            name="expiryDate"
                            required
                            type="date"
                            defaultValue={formattedDate}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <textarea
                            id="notes"
                            name="notes"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="e.g. Take with food"
                            defaultValue={medicine?.notes}
                        />
                    </div>

                    <Input
                        id="userId"
                        required
                        name="userId"
                        type="hidden"
                        defaultValue={medicine?.userId}
                    />

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditMedicineModal;
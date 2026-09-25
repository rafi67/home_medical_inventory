"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { addCategories } from '@/services/categories/addCategories'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (category: string, description: string) => void
  existingCategories: string[]
}

export function AddCategoryModal({
  isOpen,
  onClose,
  onAdd,
  existingCategories,
}: AddCategoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [state, formAction, isPending] = useActionState(addCategories, null);

  useEffect(() => {
    const open = async () => {
      // if (!isOpen) {
      //   setName('')
      //   setDescription('')
      //   setError('')
      // }
    };

    open();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category to organize your medicines.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 py-2" noValidate>
          <div className="space-y-2">
            <Label htmlFor="category-name">Category name</Label>
            <Input
              id="category-name"
              autoFocus
              placeholder="e.g. Kids' Medicine"
              value={name}
              name='name'
              aria-invalid={!!error}
              aria-describedby={error ? 'category-error' : undefined}
              className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError('')
              }}
            />
            {error && (
              <p id="category-error" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">
              Description{' '}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <textarea
              id="category-description"
              rows={3}
              maxLength={200}
              name='description'
              placeholder="e.g. Children's doses and fever reducers"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <p className="text-right text-xs text-muted-foreground">
              {description.length}/200
            </p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={onClose} className="bg-teal-600 hover:bg-teal-700">
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

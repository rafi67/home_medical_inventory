"use client";

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pill,
  Plus,
  Search,
  AlertTriangle,
  Clock,
  Package,
  Filter,
  MoreVertical,
  ChevronLeft,
  Bell,
  CheckCircle2,
} from 'lucide-react'
import { CATEGORIES, Medicine, MOCK_MEDICINES } from '@/types'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AddMedicineModal from '@/components/AddMedicineModal'
type NotificationTone = 'expired' | 'expiringSoon' | 'lowStock' | 'outOfStock'
interface AppNotification {
  id: string
  tone: NotificationTone
  title: string
  description: string
}
const DashboardPage = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleAddMedicine = (newMed: Omit<Medicine, 'id'>) => {
    const medicine: Medicine = {
      ...newMed,
      id: Math.random().toString(36).substr(2, 9),
    }
    setMedicines([medicine, ...medicines])
  }
  const handleDelete = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id))
  }
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || med.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [medicines, searchQuery, selectedCategory])
  const stats = useMemo(() => {
    const now = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(now.getDate() + 30)
    return {
      total: medicines.length,
      lowStock: medicines.filter((m) => m.quantity > 0 && m.quantity <= 10)
        .length,
      outOfStock: medicines.filter((m) => m.quantity === 0).length,
      expiringSoon: medicines.filter((m) => {
        const expDate = new Date(m.expiryDate)
        return expDate > now && expDate <= thirtyDaysFromNow
      }).length,
      expired: medicines.filter((m) => new Date(m.expiryDate) < now).length,
    }
  }, [medicines])
  const notifications = useMemo<AppNotification[]>(() => {
    const now = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(now.getDate() + 30)
    const items: AppNotification[] = []
    medicines.forEach((med) => {
      const expDate = new Date(med.expiryDate)
      if (expDate < now) {
        items.push({
          id: `expired-${med.id}`,
          tone: 'expired',
          title: `${med.name} has expired`,
          description: `Expired on ${expDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })} — dispose safely.`,
        })
      } else if (expDate <= thirtyDaysFromNow) {
        items.push({
          id: `expiring-${med.id}`,
          tone: 'expiringSoon',
          title: `${med.name} is expiring soon`,
          description: `Expires ${expDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}.`,
        })
      }
      if (med.quantity === 0) {
        items.push({
          id: `out-${med.id}`,
          tone: 'outOfStock',
          title: `${med.name} is out of stock`,
          description: 'Restock to keep this on hand.',
        })
      } else if (med.quantity <= 10) {
        items.push({
          id: `low-${med.id}`,
          tone: 'lowStock',
          title: `${med.name} is running low`,
          description: `Only ${med.quantity} ${med.unit} left.`,
        })
      }
    })
    const priority: Record<NotificationTone, number> = {
      expired: 0,
      outOfStock: 1,
      expiringSoon: 2,
      lowStock: 3,
    }
    return items.sort((a, b) => priority[a.tone] - priority[b.tone])
  }, [medicines])
  const notificationStyles: Record<
    NotificationTone,
    {
      icon: React.ReactNode
      bg: string
    }
  > = {
    expired: {
      icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
      bg: 'bg-red-50',
    },
    outOfStock: {
      icon: <Package className="w-4 h-4 text-slate-600" />,
      bg: 'bg-slate-100',
    },
    expiringSoon: {
      icon: <Clock className="w-4 h-4 text-orange-600" />,
      bg: 'bg-orange-50',
    },
    lowStock: {
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      bg: 'bg-amber-50',
    },
  }
  const getStatusBadge = (med: Medicine) => {
    const expDate = new Date(med.expiryDate)
    const now = new Date()
    if (expDate < now) {
      return (
        <Badge
          variant="destructive"
          className="bg-red-50 text-red-700 hover:bg-red-50 border-red-100"
        >
          <AlertTriangle className="w-3 h-3 mr-1" /> Expired
        </Badge>
      )
    }
    if (med.quantity === 0) {
      return (
        <Badge
          variant="secondary"
          className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200"
        >
          <Package className="w-3 h-3 mr-1" /> Out of Stock
        </Badge>
      )
    }
    if (med.quantity <= 10) {
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-100"
        >
          <AlertTriangle className="w-3 h-3 mr-1" /> Low Stock
        </Badge>
      )
    }
    return (
      <Badge
        variant="outline"
        className="bg-emerald-50 text-emerald-700 border-emerald-100"
      >
        Good
      </Badge>
    )
  }
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navigation */}
      <header className="bg-background border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-teal-600">
              <Pill className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                MediVault
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full text-muted-foreground hover:text-foreground"
                  aria-label={`Notifications${notifications.length ? `, ${notifications.length} unread` : ''}`}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-semibold">Notifications</span>
                  {notifications.length > 0 && (
                    <span className="text-xs font-normal text-muted-foreground">
                      {notifications.length} alert
                      {notifications.length > 1 ? 's' : ''}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-0" />
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <p className="text-sm font-medium text-foreground">
                      You're all caught up
                    </p>
                    <p className="text-xs text-muted-foreground">
                      No alerts about expiry or stock right now.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto py-1">
                    {notifications.map((note) => (
                      <DropdownMenuItem
                        key={note.id}
                        className="flex items-start gap-3 px-4 py-3 cursor-default focus:bg-slate-50"
                      >
                        <span
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notificationStyles[note.tone].bg}`}
                        >
                          {notificationStyles[note.tone].icon}
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground leading-tight">
                            {note.title}
                          </span>
                          <span className="text-xs text-muted-foreground leading-snug">
                            {note.description}
                          </span>
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Inventory Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your home medications and track expiry dates.
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-600/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Package className="w-5 h-5" />
                <h3 className="font-medium text-sm">Total Items</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.total}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-medium text-sm">Low Stock</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.lowStock}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 text-red-600 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-medium text-sm">Expired</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.expired}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 text-orange-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-medium text-sm">Expiring Soon</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.expiringSoon}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                className="pl-9 bg-slate-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              <Button
                variant={selectedCategory === 'All' ? 'default' : 'secondary'}
                onClick={() => setSelectedCategory('All')}
                className={`rounded-xl whitespace-nowrap ${selectedCategory === 'All' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                All
              </Button>
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'secondary'}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl whitespace-nowrap ${selectedCategory === cat ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medicine List */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredMedicines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Package className="w-8 h-8 mb-2 opacity-20" />
                        <p>No medicines found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMedicines.map((med) => (
                    <TableRow key={med.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                            <Pill className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">
                              {med.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {med.dosage}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {med.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {med.quantity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {med.unit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-foreground">
                          {new Date(med.expiryDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(med)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                              onClick={() => handleDelete(med.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </Card>
      </main>

      <AddMedicineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedicine}
      />
    </div>
  )
}

export default DashboardPage;
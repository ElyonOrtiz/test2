'use client';

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as Dialog from '@radix-ui/react-dialog';
import { Label } from "@radix-ui/react-label";
import { api } from "@/api/api";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

async function getDatas() {
  const res = await api.get('/client');
  return res.data;
}

type Client = {
  id: string;
  name: string;
  email: string;
};

export default function DataTable() {
  const [data, setData] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const fetchData = async () => {
    const res = await getDatas();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (event: React.FormEvent) => {
    try {
      const res = await api.delete(`/client/${selectedClient?.id}`);
      if (res.status === 204) {
        alert("Excluído com sucesso");
        fetchData();
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        alert(err.response.data.message);
      } else {
        alert("Erro de Servidor Tente mais tarde");
      }
    } finally {
      setIsDeleteModalOpen(false); // Fecha o modal de exclusão
    }
    console.log(`Delete item with id: ${selectedClient?.id}`);
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedClient = {
      email: selectedClient?.email,
      name: selectedClient?.name,
    }
    try {
      await api.put(`/client/${selectedClient?.id}`, updatedClient);
      alert("Editado com sucesso");
      fetchData(); // Atualiza a tabela após a edição
    } catch (err) { 
      if (err instanceof AxiosError && err.response) {
        alert(err.response.data.message);
      } else {
        alert("Erro de Servidor Tente mais tarde");
      }
    } finally {
      setIsEditModalOpen(false); // Fecha o modal de edição
    }
  };

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Ações",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const client = row.original;

        return (
          <TableCell>
            <div className="flex gap-1">
              <Button size={"sm"} className="p-2" onClick={() => handleEdit(client)}>
                <Pencil />
              </Button>
              <Button variant="destructive" size={"sm"} className="p-2" onClick={() => handleDelete(client)}>
                <Trash2 />
              </Button>
            </div>
          </TableCell>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col bg-white px-20 py-10 rounded-sm border border-gray-300 ">
      <h1 className="text-2xl font-bold text-gray-500">Lista de clientes</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-0" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modal de Exclusão */}
      <Dialog.Root open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold">Confirmação de Exclusão</Dialog.Title>
          <Dialog.Description className="mt-2">Tem certeza que deseja excluir este cliente?</Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmDelete}>Excluir</Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {/* Modal de Edição */}
      <Dialog.Root open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-bold">Editar Cliente</Dialog.Title>
          <Dialog.Description className="mt-2">Altere as informações do cliente abaixo:</Dialog.Description>
          <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={selectedClient?.name ?? ""}
                onChange={(e) => setSelectedClient(prev => prev ? { ...prev, name: e.target.value } : null)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={selectedClient?.email ?? ""}
                onChange={(e) => setSelectedClient(prev => prev ? { ...prev, email: e.target.value } : null)}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

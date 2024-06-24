'use client';
import { Input } from "@/components/ui/input";

import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-tabele/dataTable";
import { api } from "@/api/api";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      email,
      name,
    }
    try {
      const res = await api.post('/client', data);
      console.log("Novo cliente criado:", res.data);

      
      setName("");
      setEmail("");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar novo cliente:", error);
    }
  };

  return (
    <div className="md:flex md:space-y-0 block h-full gap-8 space-y-8 bg-gray-100 p-4 w-full justify-center">
      <form onSubmit={handleSubmit} className="flex-col gap-2 md:px-20 md:py-10 px-4 py-4 flex h-max justify-center bg-white border rounded-sm border-gray-300">
        <h1 className="text-2xl font-bold text-gray-500">Adicionar cliente</h1>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Exemplo de Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Criar</Button>
      </form>
      <DataTable />
    </div>
  );
}
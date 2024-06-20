import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Page() {
  return (
    <div className="flex bg-gray-100 h-full p-4 w-full justify-center">
      <div className="flex-col gap-2 px-20 py-10 flex h-max justify-center bg-white border rounded-sm border-gray-300">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="clientes..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
        </div>          
          <Table>
            <TableCaption>Lista de clientes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Elyon</TableCell>
                <TableCell>elyon.ortiz08@gmail.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Elyon</TableCell>
                <TableCell>elyon.ortiz08@gmail.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Elyon</TableCell>
                <TableCell>elyon.ortiz08@gmail.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    </div>
  );
}

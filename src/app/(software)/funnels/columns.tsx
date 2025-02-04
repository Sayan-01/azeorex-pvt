'use client'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

// export const columns: ColumnDef<FunnelsForSubAccount>[] = [

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    //@ts-expect-error row.original row.original might not have the expected type
    cell: ({ row }) => {
      return (
        <Link
          className="flex gap-2 items-center"
          href={`/agency/${row.original.agencyId}/funnels/${row.original.id}`}
        >
          {row.getValue("name")}
          <ExternalLink size={15} />
        </Link>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    //@ts-expect-error row.original might not have the expected type
    cell: ({ row }) => {
      const date = ` ${row.original.updatedAt.toDateString()} ${row.original.updatedAt.toLocaleTimeString()} `;
      return <span className="text-muted-foreground">{date}</span>;
    },
  },
  {
    accessorKey: "published",
    header: "Status",
    //@ts-expect-error row.original might not have the expected type
    cell: ({ row }) => {
      const status = row.original.published;
      return status ? <Badge variant={"default"}>Live - {row.original.subDomainName}</Badge> : <Badge variant={"secondary"}>Draft</Badge>;
    },
  },
];

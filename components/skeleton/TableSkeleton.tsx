import {
    Button,
    Skeleton,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui';
  import { classNames } from '@/helper';
  
  export default function TableSkeleton() {
    return (
      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-28">Expiration</TableHead>
            <TableHead className="text-right sr-only">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow className="border-gray-600" key={index}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <div className="h-11 w-11 flex-shrink-0">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-100">
                      <Skeleton className="h-4 w-[450px]" />
                    </div>
                    <div className="mt-1 text-gray-500">
                      <Skeleton className="h-4 w-[450px]" />
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={classNames('flex-none rounded-full p-1 bg-current')}>
                    <div className={classNames('h-1.5 w-1.5 rounded-full ')} />
                  </div>
                  <div className="hidden text-white sm:block">
                    <Skeleton className="h-4 w-[50px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="text-white">
                  <Skeleton className="h-4 w-[250px]" />
                </p>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-center items-center gap-5">
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className="rounded border-2 border-gray-100 px-2 text-gray-100 hover:text-gray-900">
                    <Skeleton className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                    className="rounded border-2 border-gray-100 px-2 text-gray-100">
                    <Skeleton className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  
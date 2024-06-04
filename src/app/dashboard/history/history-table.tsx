import { lightFormat } from "date-fns";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { getHistory } from "../_lib/data";

export function HistoryTable() {
	const history = getHistory();

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Type</TableHead>
						<TableHead>Admin</TableHead>
						<TableHead>Action</TableHead>
						<TableHead>Date</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{history.map((h) => (
						<TableRow key={h.id}>
							<TableCell className="font-medium">{h.type}</TableCell>
							<TableCell>{h.admin.name}</TableCell>
							<TableCell>{h.action}</TableCell>
							<TableCell>{lightFormat(h.date, "dd/MM/yyyy HH:mm")}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
}

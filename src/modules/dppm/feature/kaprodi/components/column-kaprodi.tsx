/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from "@tanstack/react-table";
import { Check, EditIcon, TrashIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IFakultas } from "@/modules/listdata/fakultas.interface";
import Tooltip from "@/components/molecules/tooltip";
import { Badge } from "@/components/ui/badge";
import { kaprodiSchema, KaprodiType } from "../kaprodi.schema";
import { cn } from "@/lib/utils";
import Modal from "@/components/molecules/modal";
import Form from "@/components/molecules/form";
import InputField from "@/components/molecules/input-field";
import Alert from "@/components/molecules/alert";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/molecules/select-field";
import RadioField from "@/components/molecules/radio-field";
import { useUpdateKaprodi } from "../hooks/use-kaprodi/update-kaprodi";
import { IKaprodi } from "../kaprodi.interface";
import { useDeleteKaprodi } from "../hooks/use-kaprodi/delete-kaprodi";

interface ColumnKaprodiProps {
  fakultas: IFakultas[];
  refetch: () => void;
}

export const columnKaprodi = ({
  fakultas,
  refetch,
}: ColumnKaprodiProps): ColumnDef<IKaprodi>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        const index = row.index + 1;
        return <span>{index}</span>;
      },
    },
    {
      id: "nidn",
      accessorKey: "nidn",
      header: "NIDN",
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama Kaprodi",
    },
    {
      id: "fakultas",
      accessorKey: "fakultas",
      header: "Fakultas",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <Tooltip
            contentText={
              item.status === "true" ? "Kaprodi Aktif" : "Kaprodi Tidak Aktif"
            }
            side="left"
          >
            <Badge
              variant="outline"
              className={cn("p-2 hover:text-primary-foreground", {
                "border-green-500 text-green-500 hover:bg-green-500":
                  item.status === "true",
                "border-red-500 text-red-500 hover:bg-red-500":
                  item.status !== "true",
              })}
            >
              {item.status === "true" ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </Badge>
          </Tooltip>
        );
      },
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original;
        const [open, setOpen] = useState(false);
        const [alertOpen, setAlertOpen] = useState(false);
        const form = useForm<KaprodiType>({
          resolver: zodResolver(kaprodiSchema),
          defaultValues: {
            nidn: item.nidn,
            name: item.name,
            fakultas_id: item.fakultas_id,
            email: item.email,
            address: item.address,
            status: item.status === "true" ? "true" : "false",
          },
        });

        const { mutate: updateData } = useUpdateKaprodi({
          onSuccess: () => {
            toast.success("Kaprodi updated");
            refetch();
          },
          onError: (err) => {
            if (err.response?.data.error) {
              for (const [key, value] of Object.entries(
                err.response.data.error,
              )) {
                form.setError(key as keyof KaprodiType, {
                  message: value as string,
                  type: "manual",
                });
              }
            }
            toast.error(err.response?.data.error);
          },
        });

        const { mutate: deleteData } = useDeleteKaprodi({
          onSuccess: () => {
            toast.success("Kaprodi deleted");
            refetch();
          },
          onError: (err) => {
            toast.error(err.response?.data.error);
          },
        });

        const onSubmit = async (data: KaprodiType) => {
          updateData({
            id: item.id,
            data,
          });
        };

        const onDelete = async () => {
          deleteData({ id: item.id });
        };

        return (
          <span className="flex gap-2">
            <Modal
              Icon={EditIcon}
              size="icon"
              btnStyle="bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
              title={`edit ${item.name}`}
              description={`edit data ${item.name} ini`}
              open={open}
              setOpen={setOpen}
              side="left"
              tooltipContent="edit kaprodi"
            >
              <Form form={form} onSubmit={onSubmit}>
                <InputField
                  control={form.control}
                  name="name"
                  label="nama kaprodi"
                />
                <InputField
                  control={form.control}
                  name="email"
                  label="email"
                  type="email"
                />
                <InputField control={form.control} name="nidn" label="nidn" />
                <InputField
                  control={form.control}
                  name="address"
                  label="address"
                />
                <SelectField
                  control={form.control}
                  name="fakultas_id"
                  label="fakultas"
                  options={fakultas}
                />
                <RadioField
                  control={form.control}
                  name="status"
                  label="status"
                  options={[
                    { label: "aktif", value: "true" },
                    { label: "tidak aktif", value: "false" },
                  ]}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  simpan
                </Button>
              </Form>
            </Modal>
            <Alert
              Icon={TrashIcon}
              open={alertOpen}
              setOpen={setAlertOpen}
              title={`hapus data ${item.name} ini`}
              description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
              className="bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground"
              onClick={onDelete}
              tooltipContentText="hapus kaprodi"
              size="icon"
              side="right"
            />
          </span>
        );
      },
    },
  ];
};
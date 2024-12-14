import { EllipsisVerticalIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import EachUtil from "~/utils/each-util";

export default function DashboardDosen() {
  return (
    <ScrollArea className="items-stretch min-w-0 min-h-0 flex justify-start flex-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl text-muted-foreground">Fakultas (10)</h2>
        <div className="flex flex-wrap w-full gap-3">
          <EachUtil
            of={[1, 2, 3, 4]}
            render={(item, index) => (
              <Card key={index} className="grow">
                <CardHeader className="flex flex-row items-center justify-between text-sm">
                  <span className="bg-primary/30 text-primary rounded-lg text-center px-3 py-1.5">{item}</span>
                  <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                  <h1 className="text-lg leading-none capitalize">Fakultas Teknologi Informatika</h1>
                  <p className="flex items-start gap-2 capitalize">
                    <span className="text-2xl">10</span> dosen
                  </p>
                </CardContent>
              </Card>
            )}
          />
        </div>
      </div>
    </ScrollArea>
  );
}

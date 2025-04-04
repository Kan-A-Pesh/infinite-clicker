import { cn } from "../lib/utils";

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div
        className={cn(
          "absolute inset-0 -z-50",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 -z-50 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  );
}

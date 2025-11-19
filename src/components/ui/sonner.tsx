import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-primary group-[.toaster]:shadow-2xl group-[.toaster]:py-4 group-[.toaster]:px-6",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-base",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toast]:border-green-500 group-[.toast]:bg-green-50 dark:group-[.toast]:bg-green-950",
          error: "group-[.toast]:border-red-500 group-[.toast]:bg-red-50 dark:group-[.toast]:bg-red-950",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

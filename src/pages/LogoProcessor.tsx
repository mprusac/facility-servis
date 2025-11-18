import { useState } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground, loadImage } from "@/lib/background-removal";
import logo from "@/assets/logo.png";
import { useToast } from "@/hooks/use-toast";

const LogoProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const processLogo = async () => {
    try {
      setProcessing(true);
      toast({
        title: "Obrada u tijeku...",
        description: "Uklanjanje pozadine može potrajati nekoliko trenutaka.",
      });

      // Load the logo image
      const response = await fetch(logo);
      const blob = await response.blob();
      const imageElement = await loadImage(blob);

      // Remove background
      const processedBlob = await removeBackground(imageElement);
      const url = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(url);

      toast({
        title: "Gotovo!",
        description: "Pozadina logoa je uklonjena. Kliknite na gumb za preuzimanje.",
      });
    } catch (error) {
      console.error("Error processing logo:", error);
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom obrade logoa.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const downloadProcessedImage = () => {
    if (!processedImageUrl) return;

    const link = document.createElement("a");
    link.href = processedImageUrl;
    link.download = "logo-transparent.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Uklanjanje pozadine logoa</h1>
        <p className="text-muted-foreground mb-8">
          Kliknite na gumb ispod da uklonite pozadinu logoa. Nakon obrade, preuzmite novu verziju.
        </p>

        <div className="mb-8 p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Originalni logo</h2>
          <img src={logo} alt="Original logo" className="mx-auto max-w-[200px]" />
        </div>

        {!processedImageUrl && (
          <Button
            onClick={processLogo}
            disabled={processing}
            size="lg"
            className="mb-8"
          >
            {processing ? "Obrada u tijeku..." : "Ukloni pozadinu"}
          </Button>
        )}

        {processedImageUrl && (
          <div className="mb-8 p-8 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Obrađeni logo (bez pozadine)</h2>
            <div className="bg-checkerboard rounded-lg p-4 mb-4">
              <img
                src={processedImageUrl}
                alt="Processed logo"
                className="mx-auto max-w-[200px]"
              />
            </div>
            <Button onClick={downloadProcessedImage} size="lg">
              Preuzmi logo
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Nakon preuzimanja, zamijenite datoteku src/assets/logo.png s novom verzijom.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoProcessor;

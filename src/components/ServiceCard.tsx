import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon: Icon, title, description, features }: ServiceCardProps) => {
  return (
    <Card className="h-full group hover-lift animate-fade-in-up" style={{ boxShadow: 'var(--shadow-card)' }}>
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
        </div>
        <CardTitle className="text-xl transition-colors group-hover:text-primary">{title}</CardTitle>
        <CardDescription className="transition-colors group-hover:text-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className={`flex items-start gap-2 text-sm text-muted-foreground transition-all hover:translate-x-1 animate-fade-in-up animate-delay-${index}00`}
            >
              <span className="text-secondary transition-transform hover:scale-125">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

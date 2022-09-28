import { Card, CardHeader, CardHeaderProps, CardContent, CardContentProps } from "@mui/material";

interface DefaultCardProps extends CardHeaderProps {
    content?: CardContentProps
    children?: React.ReactNode
}
export default function DefaultCard({ content, children, ...headerProps }: DefaultCardProps){
    return (
        <Card className="h-100">
            <CardHeader
                style={{paddingBottom: "1.5rem"}}
                {...headerProps}
            />
            {children && <CardContent {...content}>{children}</CardContent>}
        </Card>
    );
}

import { Button, Card } from "@mui/material"

interface IBackButtonProps {
    navigate: any
}
function BackButton(props: IBackButtonProps) {
    const { navigate } = props
    return (
        <Card
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                mb: 2,
                p: 1,
            }}
        >
            <Button variant="text" onClick={() => navigate(-1)}>
                Back
            </Button>
        </Card>
    )
}

export default BackButton
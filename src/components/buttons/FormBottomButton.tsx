import { Add, Cancel } from "@mui/icons-material"
import { Button, Stack } from "@mui/material"

interface IFormBottomButtonProps {
    isSubmitting: boolean
    handleSubmit: () => void
    handleClear: () => void
}
function FormBottomButton(props: IFormBottomButtonProps) {
    const { isSubmitting, handleSubmit, handleClear } = props
    return (
        <Stack direction="row" justifyContent="center" spacing={2} pt={2}>
            <Button
                type="button"
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleSubmit()}
                loading={isSubmitting}
            >
                Publish
            </Button>
            <Button
                color="error"
                variant="contained"
                startIcon={<Cancel />}
                onClick={handleClear}
            >
                Clear
            </Button>
        </Stack>
    )
}

export default FormBottomButton
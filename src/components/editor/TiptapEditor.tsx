import { FormControl, FormHelperText, Box } from "@mui/material";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    MenuButtonBlockquote,
    MenuButtonBold,
    MenuButtonBulletedList,
    MenuButtonCode,
    MenuButtonHorizontalRule,
    MenuButtonItalic,
    MenuButtonOrderedList,
    MenuButtonRedo,
    MenuButtonRemoveFormatting,
    MenuButtonStrikethrough,
    MenuButtonUndo,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditorProvider,
    RichTextField,
} from "mui-tiptap";
import React, { useEffect, useState } from "react";

interface TiptapEditProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
    /**
     * Optional height for the editor container. Accepts CSS height values
     * (e.g. `300`, `'300px'`, `'50vh'`). If not provided the editor will
     * use a minimum height of 200 and auto-grow.
     */
    height?: number | string;
}

const TiptapEdit: React.FC<TiptapEditProps> = ({
    value,
    onChange,
    error,
    helperText,
    height,
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type here...",
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Sync editor content when value changes (e.g., on Clear)
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!mounted) return null;

    return (
        <FormControl fullWidth error={error}>
            <RichTextEditorProvider editor={editor}>
                <Box
                    onClick={() => editor?.commands.focus()}
                    tabIndex={0}
                    role="textbox"
                    sx={{
                        // Use provided height when given, otherwise allow the editor to grow
                        height: height !== undefined ? height : 'auto',
                        minHeight: 200,
                        borderColor: error ? 'red' : 'rgba(0, 0, 0, 0.23)',
                        outline: 'none',
                        // If a fixed height is provided, allow internal scrolling
                        overflow: height !== undefined ? 'auto' : 'visible',
                        // show keyboard focus ring for accessibility
                        '&:focus-visible': {
                            boxShadow: '0 0 0 3px rgba(25,118,210,0.12)',
                            borderRadius: 1,
                        },
                    }}
                >
                    <RichTextField
                        // sx={{ height: height !== undefined ? '100%' : undefined }}
                        sx={{
                            minHeight: 200,
                        }}
                        controls={
                            <MenuControlsContainer>
                                <MenuSelectHeading />
                                <MenuDivider />
                                <MenuButtonBold />
                                <MenuButtonItalic />
                                <MenuButtonStrikethrough />
                                <MenuDivider />
                                <MenuButtonOrderedList />
                                <MenuButtonBulletedList />
                                <MenuDivider />
                                <MenuButtonBlockquote />
                                <MenuButtonCode />
                                <MenuButtonHorizontalRule />
                                <MenuDivider />
                                <MenuButtonUndo />
                                <MenuButtonRedo />
                                <MenuDivider />
                                <MenuButtonRemoveFormatting />
                            </MenuControlsContainer>
                        }
                    />
                </Box>
            </RichTextEditorProvider>

            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default TiptapEdit;

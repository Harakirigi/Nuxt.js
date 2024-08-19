import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

export default function () {
    const lowlight = TiptapcreateLowlight(Tiptapcommon);

    return [
        TiptapDocument,
        TiptapText,
        TiptapBold,
        TiptapItalic,
        TiptapStrike,
        TiptapCode,
        TiptapHistory,
        TiptapParagraph,
        TiptapHeading,
        TiptapListItem,
        TiptapBulletList,
        TiptapOrderedList,
        TiptapBlockquote,
        TiptapHorizontalRule,
        TiptapHardBreak,
        TiptapGapcursor,
        Image,
        TiptapLink,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        TiptapCodeBlockLowlight.configure({
            lowlight,
        }),
    ];
}
<template>
    <div v-if='editor'>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleBold().run()'
            :disabled='!editor.can().chain().focus().toggleBold().run()'
            :class='{ "is-active": editor.isActive("bold") }'>
            <Icon name='ic:round-format-bold' size='24' />
            <div class='tooltip'>Bold</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleItalic().run()'
            :disabled='!editor.can().chain().focus().toggleItalic().run()'
            :class='{ "is-active": editor.isActive("italic") }'>
            <Icon name='ic:round-format-italic' size='24' />
            <div class='tooltip'>Italic</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleStrike().run()'
            :disabled='!editor.can().chain().focus().toggleStrike().run()'
            :class='{ "is-active": editor.isActive("strike") }'>
            <Icon name='ic:round-strikethrough-s' size='24' />
            <div class='tooltip'>Strikethrough</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleCode().run()'
            :disabled='!editor.can().chain().focus().toggleCode().run()'
            :class='{ "is-active": editor.isActive("code") }'>
            <Icon name='ic:round-code' size='24' />
            <div class='tooltip'>Code</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().unsetAllMarks().run()'>
            <Icon name='ic:round-format-clear' size='24' />
            <div class='tooltip'>Clear</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().setParagraph().run()'
            :class='{ "is-active": editor.isActive("paragraph") }'>
            <Icon name='material-symbols:format-paragraph-rounded' size='24' />
            <div class='tooltip'>Paragraph</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button'
            @click='editor.chain().focus().toggleHeading({ level: 3 }).run()'
            :class='{ "is-active": editor.isActive("heading", { level: 3 }) }'>
            <Icon name='ci:heading' size='24' />
            <div class='tooltip'>Heading</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleBulletList().run()'
            :class='{ "is-active": editor.isActive("bulletList") }'>
            <Icon name='ic:round-format-list-bulleted' size='24' />
            <div class='tooltip'>Bulleted list</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleOrderedList().run()'
            :class='{ "is-active": editor.isActive("orderedList") }'>
            <Icon name='ic:round-format-list-numbered' size='24' />
            <div class='tooltip'>Numbered list</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleCodeBlock().run()'
            :class='{ "is-active": editor.isActive("codeBlock") }'>
            <Icon name='ic:round-terminal' size='24' />
            <div class='tooltip'>Code block</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().toggleBlockquote().run()'
            :class='{ "is-active": editor.isActive("blockquote") }'>
            <Icon name='ic:round-format-quote' size='24' />
            <div class='tooltip'>Blockquote</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().setHorizontalRule().run()'>
            <Icon name='ic:round-horizontal-rule' size='24' />
            <div class='tooltip'>Horizontal rule</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().setHardBreak().run()'>
            <Icon name='ic:round-keyboard-return' size='24' />
            <div class='tooltip'>Return</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().undo().run()'
            :disabled='!editor.can().chain().focus().undo().run()'>
            <Icon name='ic:round-undo' size='24' />
            <div class='tooltip'>Undo</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().redo().run()'
            :disabled='!editor.can().chain().focus().redo().run()'>
            <Icon name='ic:round-redo' size='24' />
            <div class='tooltip'>Redo</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='setLink'
            :disabled='!editor.can().chain().focus().redo().run()'>
            <Icon name='material-symbols:attach-file-add-rounded' size='24' />
            <div class='tooltip'>Set link</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='editor.chain().focus().unsetLink().run()'
            :disabled='!editor.isActive("link")'>
            <Icon name='material-symbols:attach-file-off-rounded' size='24' />
            <div class='tooltip'>Unset link</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click='setImage' :disabled='!editor.isActive("link")'>
            <Icon name='material-symbols:add-photo-alternate-outline-rounded' size='24' />
            <div class='tooltip'>Set image</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button'
            @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
            <Icon name='mdi:table-plus' size='24' />
            <div class='tooltip'>Insert table</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().deleteTable().run()">
            <Icon name='mdi:table-off' size='24' />
            <div class='tooltip'>Delete table</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().addColumnBefore().run()">
            <Icon name='mdi:table-column-plus-before' size='24' />
            <div class='tooltip'>Add column before</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().addColumnAfter().run()">
            <Icon name='mdi:table-column-plus-after' size='24' />
            <div class='tooltip'>Add column after</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().deleteColumn().run()">
            <Icon name='mdi:table-column-remove' size='24' />
            <div class='tooltip'>Delete column</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().addRowBefore().run()">
            <Icon name='tabler:row-insert-top' size='24' />
            <div class='tooltip'>Add row before</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().addRowAfter().run()">
            <Icon name='tabler:row-insert-bottom' size='24' />
            <div class='tooltip'>Add row after</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().deleteRow().run()">
            <Icon name='mdi:table-row-remove' size='24' />
            <div class='tooltip'>Delete row</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().toggleHeaderColumn().run()">
            <Icon name='fluent:window-header-vertical-20-filled' size='24' />
            <div class='tooltip'>Toggle header column</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().toggleHeaderRow().run()">
            <Icon name='fluent:window-header-horizontal-20-filled' size='24' />
            <div class='tooltip'>Toggle header row</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().toggleHeaderCell().run()">
            <Icon name='fluent:panel-left-header-add-28-filled' size='24' />
            <div class='tooltip'>Toggle header cell</div>
        </FormButton>
        <FormButton btn-class='semi-primary' type='button' @click="editor.chain().focus().mergeOrSplit().run()">
            <Icon name='mdi:table-merge-cells' size='24' />
            <div class='tooltip'>Merge or split</div>
        </FormButton>
    </div>
</template>

<script setup>
const { editor } = defineProps(['editor']);

const setImage = () => {
    const imageUrl = window.prompt('URL');

    if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
    }
};

const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const linkUrl = window.prompt('URL', previousUrl);

    if (linkUrl === null) {
        return;
    }

    if (linkUrl === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
};
</script>
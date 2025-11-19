/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoFgNARATAdAHDKFIGYRxATiiArABihRQDYQVc45dcUop8BGXKAdnxKpxHxo/WQQADgBdk+MMEZgJE6dPwBdSAEMApmsysSjCIqA
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Emoji,
	Mention,
	Autoformat,
	TextTransformation,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Highlight,
	Heading,
	Link,
	AutoLink,
	BlockQuote,
	HorizontalLine,
	Indent,
	IndentBlock,
	Alignment,
	ImageInline,
	ImageToolbar,
	ImageBlock,
	ImageUpload,
	CloudServices,
	ImageInsertViaUrl,
	AutoImage,
	ImageStyle,
	LinkImage,
	ImageCaption,
	ImageTextAlternative,
	List,
	TodoList,
	Table,
	TableToolbar,
	PlainTableOutput,
	TableCaption,
	ShowBlocks,
  EditorConfig
} from 'ckeditor5';

import translations from 'ckeditor5/translations/pt.js';

import 'ckeditor5/ckeditor5.css';

const LICENSE_KEY = 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjQyODc5OTksImp0aSI6IjU5ZDBlOTkyLTI4NmUtNGFjZi1iMWE3LWRmNGFjMGY3NWVhMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjEyMTY1M2EzIn0.s55zs6zEkm21vsRbZH0aHdjgUE36X7EwwhdRaIJRG86Qg_Fpm7JUSXG3D_oBjA37Yj8ICq1NJWFGl_QNRAX2Ew';

export default function Editor({
  value,
  onChange
}: {
  value?: string,
  onChange: (data: string) => void
}) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo((): { editorConfig: EditorConfig | null } => {
		if (!isLayoutReady) {
			return {
        editorConfig: null
      }
		}

		return {
			editorConfig: {
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'showBlocks',
						'|',
						'heading',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'|',
						'link',
						'insertTable',
						'highlight',
						'blockQuote',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					Alignment,
					Autoformat,
					AutoImage,
					AutoLink,
					Autosave,
					BlockQuote,
					Bold,
					CloudServices,
					Code,
					Emoji,
					Essentials,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Heading,
					Highlight,
					HorizontalLine,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					Mention,
					Paragraph,
					PlainTableOutput,
					ShowBlocks,
					Strikethrough,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline
				],
				fontFamily: {
					supportAllValues: true,
          options: [
            'default',
            'Montserrat, sans-serif',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
          ]
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				image: {
					toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
				},
				initialData: value,
				language: 'pt',
				licenseKey: LICENSE_KEY,
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				menuBar: {
					isVisible: true
				},
				placeholder: 'Escreva seu conteúdo aqui...',
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
				},
				translations: [translations]
			}
		};
	}, [isLayoutReady, value]);
  
  const handleSubmit = useCallback(async () => {
    onChange(window.document.querySelector('.ck-content')?.outerHTML || '')
  }, [])

	return editorConfig && (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
				<div ref={editorRef} className="editor-container__editor">
					<div  className='editor'>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} onBlur={handleSubmit}  />}</div>
				</div>
			</div>
		</div>
	);
}

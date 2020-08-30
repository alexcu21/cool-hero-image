/**
 * BLOCK: cool-hero-alex
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload, BlockControls, AlignmentToolbar, InspectorControls, ColorPalette } = wp.editor;
const { IconButton, PanelBody } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-cool-hero-alex', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'cool-hero-alex - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'cool-hero-alex — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */

	attributes: {
		heroTitle: {
			type: 'string',
			source: 'html',
			selector: '.hero-block h1',
		},
		heroText: {
			type: 'string',
			source: 'html',
			selector: '.hero-block p',
		},
		heroImage: {
			type: 'string',
		},
		alignContent: {
			type: 'string',
			default: 'center',
		},

		textColor: {
            type: 'string', 
            default: '#000000'
        }
	},
	supports: {
		align: [ 'wide', 'full' ],
	},
	edit: ( props ) => {
		// Extract the contents from props
		const { attributes: { heroTitle, heroText, heroImage, alignContent, textColor}, setAttributes } = props;

		// Reads the contents from the title
		const onChangeTitle = newTitle => {
			setAttributes( { heroTitle: newTitle } );
		};

		// reads the contents from the text box
		const onChangeText = newText => {
			setAttributes( { heroText: newText } );
		};

		// Access the Selected image
		const onSelectImage = newImage => {
			setAttributes( { heroImage: newImage.sizes.full.url } );
		};

		// access the alignment
		const onChangeAlignment = newAlignment => {
			setAttributes( { alignContent: newAlignment } );
		};

		// access the HEX value from the color pallete
        const onChangeTextColor = newColor => {
            setAttributes( { textColor : newColor } )
		};
		
		return (
			<React.Fragment>
			<InspectorControls>
				<PanelBody title='Color Options'>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								Main text and tagline's Color
							</label>
							<ColorPalette
								onChange={onChangeTextColor}
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>

			<div className="hero-block" style={ { backgroundImage: `url( ${ heroImage } )` } }>
				<BlockControls>
					<AlignmentToolbar
						onChange={ onChangeAlignment }
					/>
				</BlockControls>

				<MediaUpload
					onSelect={ onSelectImage }
					type="image"
					render={ ( { open } ) => (
						<IconButton
							onClick={ open }
							icon="format-image"
							showTooltip="true"
							label="Add Image"
						/>
					) }
				/>

				<h1>
					<RichText
						placeholder="Add the Title"
						onChange={ onChangeTitle }
						value={ heroTitle }
						style={ { textAlign: alignContent, color: textColor } }
					/>
				</h1>
				<p>
					<RichText
						placeholder="Add the Tagline"
						onChange={ onChangeText }
						value={ heroText }
						style={ { textAlign: alignContent, color: textColor } }
					/>
				</p>
			</div>
			</React.Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		// Extract the contents from props
		const { attributes: { heroTitle, heroText, heroImage, alignContent } } = props;

		return (
			<div className="hero-block" style={ { backgroundImage: `url( ${ heroImage } )` } }>
				<h1 style={ { textAlign: alignContent } } >
					<RichText.Content value={ heroTitle } />
				</h1>
				<p style={ { textAlign: alignContent } } >
					<RichText.Content value={ heroText } />
				</p>
			</div>
		);
	},
} );

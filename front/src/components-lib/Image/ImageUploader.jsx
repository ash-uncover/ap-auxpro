import React from 'react'
import './Image.scss'

import { BaseComponent, APFiles, MimeTypes } from 'ap-react-bootstrap'

import ImageHelper from 'helpers/ImageHelper'

class ImageUploader extends BaseComponent {

	constructor(props) {
		super(props)
		// Methods
		this.onChange = this._onChange.bind(this)
		// Base classes
		this.baseClasses = [ 'ap-image-uploader' ]
		this.state = {
			error: '',
			src: this.props.src
		}
		this.imageProps = {}
		// Component properties
		this.propsInfos = {
			required : {
				onChange: {}
			},
			optionnal : {
				src: {},
				maxSize: { defaultValue: 2100000, store: this.imageProps },
				types: { defaultValue: MimeTypes.IMAGES, store: this.imageProps }
			}
		}
	}

	createObjectURL(object) {
	    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
	}

	revokeObjectURL(url) {
	    return (window.URL) ? window.URL.revokeObjectURL(url) : window.webkitURL.revokeObjectURL(url);
	}

	_onChange(event) {
		event.preventDefault()
		if (this.fileInput.files.length && this.fileInput.files[0]) {
			let file = this.fileInput.files[0]
			let extOk = APFiles.checkExtension(file, MimeTypes.buildExtension(this.imageProps.types))
			if (!extOk) {
				this.setState({ error: 'Type de fichier non supporté' })
				return
			}
			let sizeOk = APFiles.checkSize(file, this.imageProps.maxSize)
			if (!sizeOk) {
				this.setState({ error: 'Le fichier sélectionné est trop gros (taille max: 2Mo)' })
				return
			}
			this.setState({ 
				src: this.createObjectURL(file),
				error: '' 
			})
			this.props.onChange(file)
		}
	}

	render() {
		this.buildProps('ImageUploader')
		return (
			<div className={this.className}>
				<div className='ap-image-uploader-images'>
					<img className='ap-image-uploader-image ap-image-uploader-image-big' src={this.state.src}/>
					<img className='ap-image-uploader-image ap-image-uploader-image-med' src={this.state.src}/>
					<img className='ap-image-uploader-image ap-image-uploader-image-small' src={this.state.src}/>
				</div>

				<div className='ap-image-uploader-controls'>
					{this.state.error ? 
						<div className='ap-error'>
							{this.state.error}
						</div>
					: <br/> }

					<label 
						htmlFor='file-upload' 
						className='ap-image-uploader-label btn btn-primary'>
					    Sélectionnez un fichier
					</label>

					<input 
						id='file-upload'
						className='ap-image-uploader-input'
						ref={(c) => this.fileInput = c} 
						type='file' 
						onChange={this.onChange}
						accept={MimeTypes.buildAccept(this.imageProps.types)} />				
				</div>
			</div>
		)
	}

}
export default ImageUploader

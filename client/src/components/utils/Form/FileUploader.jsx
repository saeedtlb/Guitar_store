import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

// PROGRESS
import CircularProgress from '@material-ui/core/CircularProgress';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

// SERVER
import axios from 'axios';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      uploading: false,
      style: {
        position: 'absolute',
        width: '85%',
        height: '85%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: [],
        uploading: false,
      });
    }
    return null;
  }

  onDrop = async (files) => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    const res = await axios.post('/api/users/uploadimage', formData, config);
    this.setState(
      (prvState) => ({
        uploadedFiles: [...prvState.uploadedFiles, res.data],
        uploading: false,
      }),
      () => {
        this.props.imagesHandler(this.state.uploadedFiles);
      }
    );
  };

  remove = (id) => {
    axios.get(`/api/users/remove_image?public_id=${id}`).then((res) => {
      if (res.data.success) {
        const images = this.state.uploadedFiles.filter(
          (item) => item.public_id !== id
        );
        this.setState({ uploadedFiles: images }, () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        });
      }
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles
      ? this.state.uploadedFiles.map((image) => (
          <div
            key={image.public_id}
            className="dropzone_box dropzone_image"
            style={{ background: `url(${image.url}) no-repeat` }}
            onClick={() => this.remove(image.public_id)}
          >
            <div>
              <FontAwesomeIcon icon={faTrashAlt} style={this.state.style} />
            </div>
          </div>
        ))
      : null;

  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone onDrop={(e) => this.onDrop(e)} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone_box">
                <div {...getRootProps({ className: 'wrap dropzone_box' })}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              </section>
            )}
          </Dropzone>
          {this.showUploadedImages()}
          {this.state.uploading ? (
            <div
              className="dropzone_box"
              style={{
                textAlign: 'center',
                paddingTop: '60px',
              }}
            >
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default FileUploader;

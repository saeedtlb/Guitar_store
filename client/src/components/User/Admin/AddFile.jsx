import React, { Component } from 'react';

import UserLayout from '../../../HOC/UserLayout';

import { Link } from 'react-router-dom';

// REDUX
import { uploadFiles, getDownloadLink } from '../../../actions/user_actions';
import { USER_SERVER } from '../../utils/misc';

// UPLOAD
import Dropzone from 'react-dropzone';

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSuccess: false,
      formError: false,
      uploading: false,
      files: [],
    };
  }

  componentDidMount() {
    this.renderDownloadLink(uploadFiles(null));
  }

  renderDownloadLink = () => {
    this.props.dispatch(getDownloadLink()).then((res) => {
      this.setState({ files: res.payload });
    });
  };

  onDrop = (files) => {
    this.setState({ uploading: true });
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    this.props.dispatch(uploadFiles(formData, config)).then((res) => {
      if (res.payload.success) {
        this.setState(
          {
            formSuccess: true,
            formError: false,
            uploading: false,
          },
          () => {
            this.renderDownloadLink();
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
          }
        );
      }
    });
  };

  showLinks = () => {
    return this.state.files.map((item, i) => (
      <li key={i}>
        <Link to={`${USER_SERVER}/download/${item}`} target="_blank">
          {item}
        </Link>
      </li>
    ));
  };

  render() {
    return (
      <UserLayout>
        <h1>Upload files</h1>
        <div>
          <Dropzone
            onDrop={(e) => this.onDrop(e)}
            multiple={false}
            className="dropzone"
          >
            {({ getRootProps, getInputProps }) => (
              <section className="dropzone_box">
                <div {...getRootProps({ className: 'wrap dropzone_image' })}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              </section>
            )}
          </Dropzone>
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
          <div style={{ clear: 'both' }}>
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            {this.state.formSuccess ? (
              <div className="success_label">Success</div>
            ) : null}
          </div>
          <hr />
          <div>
            <ul style={{ marginTop: '20px' }}>{this.showLinks()}</ul>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;

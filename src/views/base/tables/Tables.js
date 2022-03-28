import React, { useState, useEffect, useCallback } from 'react'
import './table.css';
import ImageViewer from "react-simple-image-viewer";
import swal from 'sweetalert'
import { CCardImage, CCardTitle, CCardText, CCard, CCardBody, CCardHeader, CCol, CTable, CForm, CFormLabel, CFormInput, CFormTextarea, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CInputGroup, CInputGroupText, CModalBody, CModalTitle, CModalHeader, CModalFooter, CModal, CRow } from '@coreui/react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');
toast.configure()

const Tables = () => {
  const [id, setId] = useState(0);
  const [maintitle, setmaintitle] = useState('');
  const [subtitle, setsubtitle] = useState('');
  const [imageval, setImageval] = useState('');
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  // -----------------------------------------------------------------------
  const openImageViewer = useCallback((index) => {
    setCurrentImage([index]);
    setIsViewerOpen(true);
  }, []);
  // -----------------------------------------------------------------------
  const saveFile = (e) => {
    setImageval(e.target.files[0]);
  }
  // -----------------------------------------------------------------------
  const submit = async () => {
    if (!maintitle || !subtitle || !imageval) {
      toast.warning("data Fild...!", {
        autoClose: 2000,
      });
      return;
    }
    if (id == 0) {
      const formData = new FormData();
      formData.append("image", imageval);
      formData.append("main", maintitle);
      formData.append("subtit", subtitle);
      try {
        const res = await axios.post(
          "http://localhost:5000/InsertBanner",
          formData
        );
        debugger;
        setList([...list, res.data.data])
        toast.success("News Add...!", {
          autoClose: 2000
        });
        console.log(res);
      } catch (ex) {
        console.log(ex);
      }
      setVisible(false)
      setmaintitle('');
      setsubtitle('');
      setImageval('');
    }
    else {
      const formData = new FormData();
      formData.append("image", imageval);
      formData.append("main", maintitle);
      formData.append("subtit", subtitle);
      formData.append("Id", id);
      try {
        const res = await axios.post(
          "http://localhost:5000/UpdateBanner",
          formData
        );
        debugger;
        if (res.data.status == "success") {
          getdata()
          toast.success("News Updated...!", {
            autoClose: 2000
          })
        }

      } catch (ex) {
        console.log(ex);
      }
    }
    document.getElementById("demo").innerHTML = "ADD DATA";
    setId(0)
    setmaintitle('');
    setsubtitle('');
    setImageval('');
    setVisible1(false)
  }
  // -----------------------------------------------------------------------
  const edithandler = async (id) => {
    setVisible1(true)
    axios.get(`http://localhost:5000/finddata/${id}`, {
      method: 'GET',
    }).then((result) => {
      setId(id)
      setmaintitle(result.data.data.main)
      setsubtitle(result.data.data.subtit)
      setImageval(result.data.data.image_user)
    })

  }
  // -----------------------------------------------------------------------
  function getdata() {
    axios.get(`http://localhost:5000/finddata`)
      .then(function (res) {
        console.log(res.data);
        setList(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // -----------------------------------------------------------------------
  useEffect(() => {
    getdata();
  }, [])
  // -----------------------------------------------------------------------
  const deletehandler = async (id) => {
    swal(
      {
        title: "Are you sure Delete Your Data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:5000/DeleteBanner/${id}`)
            .then(res => {
              const users = res.data;
              getdata();
            })
          toast.error("News deleted...!", {
            autoClose: 2000
          });
          swal("Hurrayyyyyyy ", "Your Data  has been deleted!", {
            icon: "success",

          })
        }
        else {
          toast.info("News Data Safe...!", {
            autoClose: 2000
          });
        }
      });
  }
  return (
    <>
      {/* insert data  */}
      {/* ----------------------------------------------------------------------- */}
      <CButton style={{ marginTop: "10px", marginBottom: "20px", marginLeft: "50%", transform: "translateX(-50%)" }} onClick={() => setVisible(!visible)}>ADD NEWS</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Popup News Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Add news</strong>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">MAIN-TITLE</CFormLabel>
                    <CFormInput type="text" id="exampleFormControlInput1" value={maintitle} onChange={(e) => { setmaintitle(e.target.value) }} placeholder="your Main title" />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">SUB-TITLE</CFormLabel>
                    <CFormTextarea id="exampleFormControlTextarea1" value={subtitle} onChange={(e) => { setsubtitle(e.target.value) }} placeholder="your Sub title" rows="3"></CFormTextarea>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="formFileMultiple">SELECT-IMAGE</CFormLabel>
                    <CFormInput type="file" id="formFileMultiple" placeholder="your Main title" onChange={saveFile} />
                  </div>
                  {/* <div className="mb-3">
                <CButton color="primary" id="demo" onClick={submit}>ADD DATA</CButton>
              </div> */}
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={submit} id="demo">ADD NEWS DATA</CButton>
        </CModalFooter>
      </CModal>


      {/*Table and search  */}


      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <marquee width="100%" direction="vspace" scrollamount="10" behavior="alternate"><h1 className="abc">News Show</h1></marquee>
          </CCardHeader>
          <CCardBody>
            <CInputGroup className="flex-nowrap">
              <CInputGroupText color='primary' >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>&nbsp;&nbsp;&nbsp;Search
              </CInputGroupText>
              <CFormInput placeholder="Search Username" value={search} onChange={(e) => { setSearch(e.target.value) }} aria-label="Username" aria-describedby="addon-wrapping" />
            </CInputGroup>
            <br></br>
            {
              list.filter(data => data.main.match(new RegExp(search, "i"))).reverse().map((item, i) => {

                return (<>
                  <CCard style={{ width: '18rem',display:"flex",display:"inline-block",margin:"10px", backgroundImage:"linear-gradient(170deg,#000000,#434343)",borderRadius:"10px" }}>
                    <img
                      src={`http://localhost:5000/${item.image_user}`}
                      onClick={() => openImageViewer("http://localhost:5000/" + item.image_user)}
                      width="282px"
                      height="200px"
                      key={i}
                      style={{ margin: "2px", padding: "10px" }}
                      alt=""
                    />
                    {isViewerOpen && (
                      <ImageViewer
                        src={currentImage}
                        currentIndex={0}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={setIsViewerOpen}
                        backgroundStyle={{
                          backgroundColor: "rgba(170,180,190,0.3)",
                          marginTop: "120px",
                          marginLeft: "54%",
                          width: "1400px",
                          height: "778px",
                          transform: "translateX(-45%)",
                        }}
                      />
                    )}
                    <CCardBody>
                      <CCardTitle style={{color:"white"}}>{item.main}</CCardTitle>
                      <CCardText style={{color:"white"}}>
                        {item.subtit}
                      </CCardText>
                      <CButton color="success" style={{color:"white"}} value="Update" onClick={() => edithandler(item._id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                      </CButton>

                      &nbsp;&nbsp;&nbsp;&nbsp;

                      <CButton color="danger"  style={{color:"white"}} value="delete" onClick={() => deletehandler(item._id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </CButton>
                    </CCardBody>
                  </CCard>


                  <CModal alignment="center" visible={visible1} onClose={() => setVisible1(false)}>
                    <CModalHeader>
                      <CModalTitle>Modal title</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlInput1">Tital</CFormLabel>
                          <CFormInput
                            type="text"
                            value={maintitle}
                            onChange={(e) => { setmaintitle(e.target.value) }}
                            id="exampleFormControlInput1"
                            placeholder="Enter your Tital"
                          />
                        </div>
                        <div className="mb-3">
                          <CFormLabel htmlFor="exampleFormControlTextarea1">Sub-Tital</CFormLabel>
                          <CFormTextarea
                            value={subtitle}
                            onChange={(e) => { setsubtitle(e.target.value) }}
                            id="exampleFormControlTextarea1"
                            placeholder="Enter Your Sub-Tital"
                            rows="3"
                          ></CFormTextarea>
                        </div>
                      </CForm>

                      <div >
                        <CRow>
                          <CCol xl="5">
                            <CFormLabel htmlFor="formFile">Update Image</CFormLabel>
                            <CFormInput type="file" onChange={saveFile} id="hello" />
                          </CCol>

                          <CCol>
                            <img style={{ height: "200px", width: "250px", borderRadius: "6px" }} src={"http://localhost:5000/" + imageval} ></img>
                          </CCol>
                        </CRow>
                      </div>


                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible1(false)}>
                        Close
                      </CButton>
                      <CButton color="primary" onClick={submit} id="demo" type="submit">
                        Update News
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </>
                )
              }
              )}
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}
export default Tables;

import React, { Fragment, Profiler } from "react";
import { Header, Card, Image, Button } from "semantic-ui-react";

export const UserPhotos = ({ photos, profile, deletePhoto, setMainPhoto }) => {
    let filteredPhotos;
    if (photos) {
        filteredPhotos = photos.filter(
            photo => {
                return photo.url !== profile.photoURL
            }
        )
    }
  return (
    <Fragment>
      <Header sub color='teal' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL || '/assets/user.png'} />
          <Button positive>Main Photo</Button>
        </Card>
        {photos &&
          filteredPhotos.map((photo) => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              <div className='ui two buttons'>
                <Button onClick={()=> setMainPhoto(photo)} basic color='green'>
                  Main
                </Button>
                <Button basic icon='trash' color='red' onClick={() => deletePhoto(photo)} />
              </div>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

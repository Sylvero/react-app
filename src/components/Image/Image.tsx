import React from 'react';
import Button from 'react-bootstrap/Button';
import '../User/UserStyles.css'
import ImageService from "../../services/ImageService";
import buffer from "buffer";
import './ImagesStyles.css'

interface Image {
    id: string | undefined;
    imageData: buffer.Blob| MediaSource ;
    name: string | undefined;
    type: string | undefined;
    size: number | undefined;
    src:any;

}

class Timer {
    private start: number;
    private name: string;
    private amount: number;

    constructor(name: string,amount: number) {
        this.start = performance.now();
        this.name = name;
        this.amount = amount;
    }

    stop() {
        let time = performance.now() - this.start;
        console.log(`Timer ${this.name} finished in ${Math.round(time)} ms`);
    }
}

class ImageComponent extends React.Component<{}, { images: Image[] }> {

    constructor(props: any) {
        super(props)
        this.state = {
            images: []
        }
    }
    sleep = (ms:number) => new Promise(r => setTimeout(r, ms));



    render() {
        const { images } = this.state;
        return (
            <>
                <div className={"buttons"}>
                    <Button variant="primary" onClick={() => this.getImages(50)}>Pobierz 50 zdjęć</Button>
                    <Button variant="primary" onClick={() => this.getImages(100)}>Pobierz 100 zdjęć</Button>
                    <Button variant="primary" onClick={() => this.getImages(200)}>Pobierz 200 zdjęć</Button>
                </div>
                <div className={"images"}>
                    {images.map((image) => (
                        <img key={image.id} src={'data:image/jpeg;base64,' + image.imageData} alt=""/>
                    ))}
                </div>
            </>
        );
    }


    async getImages(amount: number) {
        const timer = new Timer('getImage',amount); // create a new Timer object
        const imagePromises = [];
        for (let i = 251; i <= amount+251; i++) {
            imagePromises.push(ImageService.getImages(i));
        }
        const responses = await Promise.all(imagePromises);
        const images = responses.map((response) => response.data);
        this.setState({ images });
        timer.stop(); // call the stop method to log the elapsed time
    }
}

export default ImageComponent

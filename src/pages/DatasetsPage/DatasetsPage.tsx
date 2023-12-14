import React from 'react';
import Fade from 'react-reveal/Fade';

import DownloadButton from '../../components/DownloadButton/DownloadButton';

const DatasetsPage: React.FC = () => {

    return (
        <div className="Datasets">
            <div className='title-container'>
                <div className='background'><Fade>
                    <h1>Dataset Downloads</h1>
                </Fade></div>
            </div>
            <div className='text-components'>
                <Fade>
                    <div className='topic'>
                        <section>
                            <DownloadButton url="https://drive.google.com/file/d/1YChu_uD5Qjakhc4jRKVl0r0ovW4yi9Tm/view?usp=sharing" fileName='ALAMEDA_BGRIR.zip' buttonName="Alameda BGR IR" />
                            <p>1296x972</p>
                            <p>16 Images</p>
                        </section>

                        <section>
                            <DownloadButton url="https://drive.google.com/file/d/1mCJfDfqa5BgABkpBnHemW8kKFFG7hyC1/view?usp=sharing" fileName='BERKELEY_BGRIR.zip' buttonName="Berkeley BGR IR" />
                            <p>1640x1232</p>
                            <p>53 Images</p>
                        </section>

                        <section>
                            <DownloadButton url="https://drive.google.com/file/d/1A0djmQed4vYfWtwNXVyqVhLmHEUS_zs0/view?usp=sharing" fileName='BERKELEY_BGRIRUV.zip' buttonName="Berkeley BGR IR UV" />
                            <p>2028x1520</p>
                            <p>22 Images</p>
                        </section>
                    </div>
                </Fade>
            </div>
        </div>
    );
}
export default DatasetsPage;
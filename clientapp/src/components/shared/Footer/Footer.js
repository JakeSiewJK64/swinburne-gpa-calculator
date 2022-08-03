import githublogo from '../../../assets/img/github-brands.svg';

const Footer = () => {
    return (
        <div className='m-4'>
            <a href="https://github.com/JakeSiewJK64">
                <img src={githublogo} alt="github" style={{ width: "30px" }} className='mx-auto' draggable={false}></img>
            </a>
            <p>JakeSiewJK64 | {new Date().toString().split(' ')[3]} </p>
        </div>
    )
}

export default Footer;
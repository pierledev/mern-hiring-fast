import { Link } from 'react-router-dom';
import { Container } from '.';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className='bg-neutral-950 py-10 text-neutral-400'>
      <Container className='grid gap-8'>
        <Link to='/' className='font-bebas-neue text-3xl text-white justify-self-start'>
          HIRING FAST
        </Link>
        <div className='flex flex-col gap-8 md:flex-row md:gap-28'>
          <div className='grid gap-4'>
            <div>
              <h4 className='mb-4 text-white'>Contact Us</h4>
              <p className='mb-1'>Email: info@hiringfast.com</p>
              <p>Phone: (+62) 723-234-32</p>
            </div>
          </div>
          <div>
            <h4 className='mb-4 text-white'>Quick Links</h4>
            <nav>
              <ul className='flex flex-col gap-3 lg:flex-row lg:gap-4'>
                <li>
                  <Link className='transition hover:text-neutral-200' to='/'>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className='transition hover:text-neutral-200'
                    to='/Jobs'
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className='transition hover:text-neutral-200'
                    to='/companies'
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className='transition hover:text-neutral-200'
                    to='/about-us'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className='transition hover:text-neutral-200' to='/'>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h4 className='mb-4 text-white'>Follow Us</h4>
            <ul className='flex gap-2'>
              <li>
                <a
                  href='#'
                  className='text-2xl transition hover:text-neutral-200'
                >
                  <BsTwitterX />
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-2xl transition hover:text-neutral-200'
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-2xl transition hover:text-neutral-200'
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-2xl transition hover:text-neutral-200'
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className='mt-4 text-sm font-medium'>
          Copyright &copy; 2024. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

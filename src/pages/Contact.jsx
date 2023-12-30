import InputForm from "../components/InputForm";
import PurpleBtn from "../components/PurpleBtn";
import { newsForm, message } from "../constants";

const Contact = () => {
  return (
    <div>
      <div className="mx-auto flex items-center justify-center flex-col">
        <h1 className=" my-10 text-2xl text-purple-950 mx-auto">
          Contact Page
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14605.38017185323!2d90.79277472537117!3d23.770724441556606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37543898e0a302b7%3A0x20193abadaa41fa7!2sSaheb%20Nagar!5e0!3m2!1sen!2sbd!4v1703865502708!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className=" md:col-span-2 col-span-3 pb-6 ">
          <h2 className=" text-slate-blue text-3xl font-open font-bold  ">
            Do you have any question?
          </h2>

          <form action="https://formspree.io/f/xgegevnr" method="POST">
            <div className="flex items-center md:justify-between md:flex-row flex-col gap-3">
              {newsForm.map((items, index) => (
                <div key={index} className="md:w-fit w-full">
                  <InputForm
                    type={items.type}
                    label={items.label}
                    className={items.className}
                  />
                </div>
              ))}
            </div>

            {message.map((items, index) => (
              <div key={index}>
                <InputForm
                  type={items.type}
                  label={items.label}
                  className={items.className}
                />
              </div>
            ))}
          

          <PurpleBtn
            buttonName={"Send Message"}
            className={" bg-purple-950 "}
            type={'submit'}
          >Send Message</PurpleBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

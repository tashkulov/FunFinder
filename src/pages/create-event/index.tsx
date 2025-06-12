import {MultiStepForm} from "../../features/event/create/ui/MultiStepForm.tsx";

const CreateEventPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex justify-center items-start py-10 px-4">
            <MultiStepForm />
        </div>
    );
};

export default CreateEventPage;

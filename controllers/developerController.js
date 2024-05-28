const Developers = require("../models/Developers");
const developerSchema = require("../models/Developers")

const developerController = {};


developerController.createLoginAsDev = async (req, res) => {
    try {
        const { name, email, phoneNumber, website, role, registrationCertificate, address, country, state, city, pincode, kycDetails, Statuss } =
            req.body;
        const createDev = await developerSchema.create({ name, email, phoneNumber, website, role, registrationCertificate, address, country, state, city, pincode, kycDetails, Statuss });
        res
            .status(200)
            .json({ message: "createDev successfully", createDev });
        console.log('Created Developer:', createDev);
    } catch (error) {
        console.error("Error in createPool:", error);
        res.status(500).json({ message: error.message });
    }
};


developerController.updateDeveloperDetails = async (req, res) => {
    try {
        const { email } = req.params; // Assuming the email is passed as a parameter in the URL
        const { name, phoneNumber, website, role, registrationCertificate, address, country, state, city, pincode, kycDetails, Statuss } = req.body;

        // Find the developer by email
        const developer = await developerSchema.findOne({ email });

        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }

        // Update the fields except email
        developer.name = name || developer.name;
        developer.phoneNumber = phoneNumber || developer.phoneNumber;
        developer.website = website || developer.website;
        developer.role = role || developer.role;
        developer.registrationCertificate = registrationCertificate || developer.registrationCertificate;
        developer.address = address || developer.address;
        developer.country = country || developer.country;
        developer.state = state || developer.state;
        developer.city = city || developer.city;
        developer.pincode = pincode || developer.pincode;
        developer.kycDetails = kycDetails || developer.kycDetails;
        developer.Statuss = Statuss || developer.Statuss;

        // Save the updated developer
        const updatedDeveloper = await developer.save();

        res.status(200).json({ message: "Developer details updated successfully", updatedDeveloper });
    } catch (error) {
        console.error("Error in updateDeveloperDetails:", error);
        res.status(500).json({ message: error.message });
    }
};



developerController.getAllDevDetails = async (req, res) => {
    try {
        const alldetails = await developerSchema.find().lean();
        res.status(200).json({ message: "done", alldetails });
    } catch (error) {
        console.error("Error in getAllDevs:", error);
        res.status(500).json({ message: error.message });
    }
};

developerController.getDevDetailsByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const developer = await developerSchema.findOne({ email }).lean();
        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }
        res.status(200).json({ message: "done", developer });
    } catch (error) {
        console.error("Error in getDevDetailsByEmail:", error);
        res.status(500).json({ message: error.message });
    }
};




module.exports = developerController;
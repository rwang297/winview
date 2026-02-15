import { useState } from 'react';

export function useOpenAccountForm(config = {}) {
  const initialStep = Number(config.initialStep || 1);
  const flow = config.flow || 'full'; // "simple" | "full"
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    occupation: '',
    address: '',
    // NEW: additional fields requested on Review section
    idCardType: '',
    accountNumber: '',
  });
  const [ippisForm, setIppisForm] = useState({
    // Personal details
    surname: '',
    firstName: '',
    middleName: '',
    apfNo: '',
    rank: '',
    commandFormation: '',
    dateOfEnlistment: '',
    dateOfRetirement: '',
    residentialAddress: '',
    permanentAddress: '',
    lga: '',
    state: '',
    telephoneA: '',
    telephoneB: '',
    personalEmail: '',
    mssCfo: '',
    ippisNumber: '',
    payPoint: '',
    accountNumber: '',
    automobileType: '',
    // Personal requirements
    pfaName: '',
    pensionPIN: '',
    cooperativeNumber: '',
    memberNumber: '',
    compulsorySavings: '',
    voluntarySavings: '',
    totalSavings: '',
    hasPoliceId: false,
    currentPayslipMonths: '',
    // Next of kin
    nokSurname: '',
    nokFirstName: '',
    nokMiddleName: '',
    nokRelationship: '',
    nokAddress: '',
    nokTelephone: '',
    nokEmail: '',
    // Certification
    monthlyRepayment: '',
    applicantFullName: '',
    applicantRank: '',
    applicantDate: '',
    yearsLeftInService: '',
    signature: '',
  });

  // NEW: Section B - Account Opening form state
  const [bForm, setBForm] = useState({
    // Category / ownership
    typeIndividual: false,
    typeJoint: false,
    nameOfAccount: '',
    prodStandardSaving: false,
    prodAssusu: false,
    prodTarget: false,
    prodKiddies: false,
    prodMicroCredit: false,
    prodSaveSmile: false,
    prodCurrent: false,
    branch: '',
    bvn: '',
    accountNumberOffice: '',
    // Personal info
    title: '',
    surname: '',
    firstName: '',
    otherNames: '',
    motherMaidenName: '',
    nickName: '',
    dob: '',
    gender: '',
    placeOfBirth: '',
    nationality: '',
    stateOfOrigin: '',
    homeTown: '',
    maritalStatus: '',
    phone1: '',
    phone2: '',
    residentialAddress: '',
    state: '',
    localGovt: '',
    district: '',
    town: '',
    landmark: '',
    idNational: false,
    idDrivers: false,
    idPassport: false,
    idVoters: false,
    idOther: false,
    idNumber: '',
    idIssueState: '',
    idExpires: '',
    testQuestion: '',
    testAnswer: '',
    purposeOfAccount: '',
    // NOK
    nokName: '',
    nokRelationship: '',
    nokTelephone: '',
    nokDob: '',
    nokGender: '',
    nokAddress: '',
    nokEmail: '',
    nokNationality: '',
    nokStateOfOrigin: '',
    nokLocalGovt: '',
    nokHomeTown: '',
    // Services
    svcAtmCard: false,
    svcSmsAlert: false,
    svcEmailAlert: false,
    svcOthers: false,
    svcMobileBanking: false,
    svcMailStatement: false,
  });

  // NEW: Section C - Account Mandate & Docs & Terms
  const [cForm, setCForm] = useState({
    dateAccountOpened: '',
    signatureUrl: '',
    passportPhotoUrl: '',
    // docs
    docTwoPassports: false,
    docValidId: false,
    docIdType: '',
    docIdNumber: '',
    docIssueState: '',
    docExpiryDate: '',
    docUtilityBill: false,
    docTwoReferences: false,
    // terms
    termsAccepted: false,
    customerSignatureName: '',
    customerSignatureDate: '',
    noteAcknowledged: false,
  });

  // NEW: Section D - Reference Forms
  const [dForm, setDForm] = useState({
    minDepositAcknowledged: false,
    // Referee 1
    r1_name: '',
    r1_date: '',
    r1_address: '',
    r1_applicantName: '',
    r1_businessOffice: '',
    r1_applicantSigns: '',
    r1_bankName: '',
    r1_branch: '',
    r1_accountNo: '',
    r1_signatureOfReferee: '',
    r1_official_refereeBank: '',
    r1_official_clientSignatureVerifiedBy: '',
    r1_official_toBusinessOffice: '',
    r1_official_verificationResult: '',
    r1_official_signedBy1: '',
    r1_official_signedBy2: '',
    // Referee 2
    r2_name: '',
    r2_date: '',
    r2_address: '',
    r2_applicantName: '',
    r2_businessOffice: '',
    r2_applicantSigns: '',
    r2_bankName: '',
    r2_branch: '',
    r2_accountNo: '',
    r2_signatureOfReferee: '',
    r2_official_refereeBank: '',
    r2_official_clientSignatureVerifiedBy: '',
    r2_official_toBusinessOffice: '',
    r2_official_verificationResult: '',
    r2_official_signedBy1: '',
    r2_official_signedBy2: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIppisChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIppisForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // NEW: handler for Section B form
  const handleBFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // NEW: handler for Section C form
  const handleCFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // NEW: handler for Section D form
  const handleDFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((s) => s + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  // helper: compute age from DOB (YYYY-MM-DD)
  const computeAge = (dobStr) => {
    if (!dobStr) return undefined;
    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) return undefined;
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (flow === 'simple') {
        // SIMPLE FLOW: Only create account from formData
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: Number(formData.age),
          gender: formData.gender,
          occupation: formData.occupation,
          address: formData.address,
          // pass new fields
          idCardType: formData.idCardType || null,
          accountNumber: formData.accountNumber || null,
        };

        const res = await fetch('/api/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(
            `When creating account, the response was [${res.status}] ${res.statusText}`
          );
        }
        setIsSuccess(true);
        return;
      }

      // FULL FLOW: Build account payload with smart fallbacks so the flow can start at IPPIS/B without earlier steps
      const derivedFullName =
        formData.fullName ||
        [bForm.firstName, bForm.otherNames, bForm.surname].filter(Boolean).join(' ') ||
        [ippisForm.firstName, ippisForm.middleName, ippisForm.surname].filter(Boolean).join(' ') ||
        ippisForm.applicantFullName ||
        '';
      const derivedEmail = formData.email || ippisForm.personalEmail || '';
      const derivedPhone =
        formData.phone ||
        bForm.phone1 ||
        ippisForm.telephoneA ||
        bForm.phone2 ||
        ippisForm.telephoneB ||
        '';
      const derivedAge = Number(formData.age) || computeAge(bForm.dob) || 25;
      const derivedGender = formData.gender || bForm.gender || 'unspecified';
      const derivedOccupation = formData.occupation || ippisForm.rank || 'Salary Earner';
      const derivedAddress =
        formData.address ||
        bForm.residentialAddress ||
        ippisForm.residentialAddress ||
        ippisForm.permanentAddress ||
        bForm.town ||
        '';

      // Guard rails – surface clear guidance if minimum details are missing
      const missing = [];
      if (!derivedFullName) missing.push("Full name (e.g., IPPIS → Applicant's Full Name)");
      if (!derivedEmail) missing.push('Email (IPPIS → Personal Email)');
      if (!derivedPhone) missing.push('Phone (IPPIS → Telephone A)');
      if (!derivedAddress) missing.push('Address (IPPIS → Residential Address)');

      if (missing.length) {
        console.error('Missing required fields for account:', missing);
        alert(
          `Please complete these before finishing setup:\n\n- ${missing.join(
            '\n- '
          )}\n\nTip: You can fill them in the IPPIS sections.`
        );
        // Nudge back to the first step (IPPIS) to fill details
        setCurrentStep(1);
        return;
      }

      // Additional validations for Section B (Mode of ID required & card number pattern)
      const selectedIdMode = bForm.idDrivers
        ? 'drivers'
        : bForm.idPassport
          ? 'passport'
          : bForm.idNational
            ? 'national'
            : bForm.idVoters
              ? 'voters'
              : '';

      if (!selectedIdMode) {
        alert('Please select a Mode of Identification in Section B.');
        setCurrentStep(2);
        return;
      }
      if (!bForm.idNumber) {
        alert('Please enter the Card Number in Section B.');
        setCurrentStep(2);
        return;
      }
      const id = String(bForm.idNumber).trim();
      const patterns = {
        national: /^\d{11}$/, // NIN is 11 digits
        passport: /^[A-Za-z0-9]{6,10}$/,
        drivers: /^[A-Za-z0-9]{6,16}$/,
        voters: /^[A-Za-z0-9\/\-]{8,24}$/,
      };
      const readableNames = {
        national: 'National I.D Card (11 digits)',
        passport: 'International Passport (6–10 letters/numbers)',
        drivers: "Driver's License (6–16 letters/numbers)",
        voters: "Voter's Card (8–24 letters/numbers)",
      };
      const pat = patterns[selectedIdMode];
      if (pat && !pat.test(id)) {
        alert(
          `Card Number format looks wrong for ${readableNames[selectedIdMode]}. Please check and try again.`
        );
        setCurrentStep(2);
        return;
      }

      const accountPayload = {
        fullName: derivedFullName,
        email: derivedEmail,
        phone: derivedPhone,
        age: derivedAge,
        gender: derivedGender,
        occupation: derivedOccupation,
        address: derivedAddress,
        // Include new fields if provided
        idCardType: formData.idCardType || null,
        accountNumber: formData.accountNumber || null,
      };

      // 1) Create account
      const accountRes = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountPayload),
      });
      if (!accountRes.ok) {
        throw new Error(
          `When creating account, the response was [${accountRes.status}] ${accountRes.statusText}`
        );
      }
      const accountJson = await accountRes.json();

      // 2) Save IPPIS application (wire to DB)
      const ippisPayload = {
        ...ippisForm,
        // fallback personal email to main email if not provided
        personalEmail: ippisForm.personalEmail || derivedEmail,
        // link to created account
        accountId: accountJson.accountId,
      };
      const ippisRes = await fetch('/api/ippis-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ippisPayload),
      });
      if (!ippisRes.ok) {
        throw new Error(
          `When saving IPPIS application, the response was [${ippisRes.status}] ${ippisRes.statusText}`
        );
      }

      // 3) Save Section B (Account Opening)
      const bPayload = {
        ...bForm,
        accountId: accountJson.accountId,
      };
      const bRes = await fetch('/api/account-opening-b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bPayload),
      });
      if (!bRes.ok) {
        throw new Error(
          `When saving Section B, the response was [${bRes.status}] ${bRes.statusText}`
        );
      }

      // 4) Save Section C (Account Mandate & Docs & Terms)
      const cPayload = {
        ...cForm,
        accountId: accountJson.accountId,
      };
      const cRes = await fetch('/api/account-mandate-c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cPayload),
      });
      if (!cRes.ok) {
        throw new Error(
          `When saving Section C, the response was [${cRes.status}] ${cRes.statusText}`
        );
      }

      // 5) Save Section D (Reference Forms)
      const dPayload = {
        ...dForm,
        accountId: accountJson.accountId,
      };
      const dRes = await fetch('/api/reference-forms-d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dPayload),
      });
      if (!dRes.ok) {
        throw new Error(
          `When saving Section D, the response was [${dRes.status}] ${dRes.statusText}`
        );
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit application. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    ippisForm,
    bForm,
    cForm,
    dForm,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleIppisChange,
    handleBFormChange,
    handleCFormChange,
    handleDFormChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    // expose setter so pages can jump to a step (e.g., start at IPPIS)
    setCurrentStep,
  };
}

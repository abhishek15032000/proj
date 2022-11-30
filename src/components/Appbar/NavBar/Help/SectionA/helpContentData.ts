import { pathNames } from '../../../../../routes/pathNames'
import { Images } from '../../../../../theme'

export const IssuanceHelpContentData = {
  projectIntro: {
    title: 'Project Introduction',
    description:
      'The Project developer would provide basic details related to the project like the project name, project type(user can select multiple projects in case the project falls under multiple project categories from the list), location of the project, start and end date of the project (end date if optional in case the project owner is not aware of it), Size of the project in SqKm. ',
    imgSrcEmptyFields: Images.INTROEMPTY,
    imgSrcFields: Images.List,
    footerText: 'Sample of project introduction with details filled out.',
    footerTextWith: 'Sample of project introduction with details filled .',
  },

  A1: {
    title: 'General details of the project',
    description:
      'Project developer provides a brief description of the project, measures that the project would take that would help in the reduction or removal of greenhouse gas emissions, technology and types of equipment that they would be using in the facility to help achieve the goals of greenhouse gas reduction. Details of important dates of the project like the construction date of the project, post-construction when did the project start (commissioned) and duration of the project or operational period of the project. Total Co2 reduced so far in case the project has started and Co2 was removed during the monitoring period. ',
    imgSrcEmptyFields: Images.A1EMPTY,
    imgSrcFields: Images.A1FILLED,
    footerText: 'Sample of project description with details filled out.',
    footerTextWith: 'Sample of project description with details filled .',
  },
  A2: {
    title: 'Location of the project',
    description:
      'Project developer provides details of the location of the project. Location details include Country, State, District, Pincode and any distinct landmark around the project location. They can upload images of the project location and google maps for the verifier to easily verify the project location.  ',
    footerText: 'Sample of project location with details filled out.',
    footerTextWith: 'Sample of project location with details filled .',
    imgSrcEmptyFields: Images.A2EMPTY,
    imgSrcFields: Images.A2FILLED,
  },
  A3: {
    title: 'Project participants',
    description:
      'User needs to provide information about the owner of the project, private and public owners/ participants that might be supporting the project i.e they could be from another country other than the project location and indicator if the parties wish to be listed as project participants. Users can select from the Yes, No, or Not sure options. ',
    imgSrcEmptyFields: Images.A3EMPTY,
    imgSrcFields: Images.A3FILLED,
    footerText:
      'Sample of project parties and project participants with details filled out.',
    footerTextWith:
      'Sample of project parties and project participants with details filled.',
  },
  A4: {
    title: 'Reference and Applied methodologies',
    description:
      'Based on the project and project types users can select one or more methodologies and provide the details of each methodology, the methodology version and the tools they will use to monitor the project.',
    imgSrcEmptyFields: Images.A4EMPTY,
    imgSrcFields: Images.A4FILLED,

    footerText:
      'Sample of project reference and applied methodology with details filled out.',
    footerTextWith:
      'Sample of project reference and applied methodology with details filled .',
  },
  A5: {
    title: 'Crediting Period',
    description:
      'Project developers provide the details of the crediting period, information like the first crediting date, start date and end date of the crediting period. Users can also elaborate on the crediting period in the detail section. ',
    imgSrcEmptyFields: Images.A5EMPTY,
    imgSrcFields: Images.A5FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
}

export const SectionAHelpContentData = [
  {
    title: 'General details of the project',
    description:
      'Project developer provides a brief description of the project, measures that the project would take that would help in the reduction or removal of greenhouse gas emissions, technology and types of equipment that they would be using in the facility to help achieve the goals of greenhouse gas reduction. Details of important dates of the project like the construction date of the project, post-construction when did the project start (commissioned) and duration of the project or operational period of the project. Total Co2 reduced so far in case the project has started and Co2 was removed during the monitoring period. ',
    imgSrcEmptyFields: Images.A1EMPTY,
    imgSrcFields: Images.A1FILLED,
    footerText: 'Sample of project description with details filled out.',
    footerTextWith: 'Sample of project description with details filled .',
  },
  {
    title: 'Location of the project',
    description:
      'Project developer provides details of the location of the project. Location details include Country, State, District, Pincode and any distinct landmark around the project location. They can upload images of the project location and google maps for the verifier to easily verify the project location.  ',
    footerText: 'Sample of project location with details filled out.',
    footerTextWith: 'Sample of project location with details filled .',
    imgSrcEmptyFields: Images.A2EMPTY,
    imgSrcFields: Images.A2FILLED,
  },
  {
    title: 'Project participants',
    description:
      'User needs to provide information about the owner of the project, private and public owners/ participants that might be supporting the project i.e they could be from another country other than the project location and indicator if the parties wish to be listed as project participants. Users can select from the Yes, No, or Not sure options. ',
    imgSrcEmptyFields: Images.A3EMPTY,
    imgSrcFields: Images.A3FILLED,
    footerText:
      'Sample of project parties and project participants with details filled out.',
    footerTextWith:
      'Sample of project parties and project participants with details filled.',
  },
  {
    title: 'Reference and Applied methodologies',
    description:
      'Based on the project and project types users can select one or more methodologies and provide the details of each methodology, the methodology version and the tools they will use to monitor the project.',
    imgSrcEmptyFields: Images.A4EMPTY,
    imgSrcFields: Images.A4FILLED,

    footerText:
      'Sample of project reference and applied methodology with details filled out.',
    footerTextWith:
      'Sample of project reference and applied methodology with details filled .',
  },
  {
    title: 'Crediting Period',
    description:
      'Project developers provide the details of the crediting period, information like the first crediting date, start date and end date of the crediting period. Users can also elaborate on the crediting period in the detail section. ',
    imgSrcEmptyFields: Images.A5EMPTY,
    imgSrcFields: Images.A5FILLED,
    footerText: 'Sample of project crediting period with details filled out.',
    footerTextWith: 'Sample of project crediting period with details filled .',
  },
]

export const DashboardHelpContentData = {
  title: 'Description of Project Activity',
  sectionDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus.',
  Project: {
    title: ' Step 1 : Project Introduction',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    imgSrcEmptyFields: Images.INTROEMPTY,
    imgSrcFields: Images.INTROFILLED,
    footerText:
      'Complete the project introduction form with details relevant to the project being mentioned.',
  },
  A1: {
    title: 'Step 2 : Purpose & General description',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    imgSrcEmptyFields: Images.A1EMPTY,
    imgSrcFields: Images.A1FILLED,
    footerText:
      'Complete the project introduction form with details relevant to the project being mentioned.',
  },
  A2: {
    title: 'Step 3 : Location',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    // imgSrc: Images.DemoImg,
    imgSrcEmptyFields: Images.A2EMPTY,
    imgSrcFields: Images.A1FILLED,
    footerText: '',
  },
  A3: {
    title: 'Step 4 : Parties & Project Participants',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    imgSrcEmptyFields: Images.A3EMPTY,
    imgSrcFields: Images.A3FILLED,
    footerText: '',
  },
  A4: {
    title: 'Step 5 : Reference & Applied Methodology',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    imgSrcEmptyFields: Images.A4EMPTY,
    imgSrcFields: Images.A4FILLED,
    footerText: '',
  },
  A5: {
    title: 'Step 6 : Crediting Period',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus. ',
    imgSrcEmptyFields: Images.A5EMPTY,
    imgSrcFields: Images.A5FILLED,
    footerText: '',
  },
}

export const DashboardHelpSectionFAQ = {
  title: 'FAQs',
  sectionDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus.',
  questions: [
    { title: 'How to create/link wallet', value: '' },
    { title: 'How to list new a project', value: pathNames.HELP_CENTER },
  ],
}

export const HelpContentIssuanceAllData = {
  title: 'How to list a new project',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum aenean amet, hac ultricies enim donec suscipit sed duis. In vulputate pellentesque sed quam tincidunt nec et lectus.',
  steps: [
    {
      title: 'Step 1 : Project Introduction',
      description:
        'The Project developer would provide basic details related to the project like the project name, project type(user can select multiple projects in case the project falls under multiple project categories from the list), location of the project, start and end date of the project (end date if optional in case the project owner is not aware of it), Size of the project in SqKm. ',
      imgSrcEmptyFields: Images.INTROEMPTY,
      imgSrcFields: Images.INTROFILLED,
      footerText: 'Sample of project introduction with details filled out.',
      footerTextWith: 'Sample of project introduction with details filled .',
    },
    {
      title: 'Step 2: Description of Project Activity (Section A)',
      description:
        'Project developer provides details related to the project that they wish to register. Details like general details, purpose, location, parties directly or indirectly involved, and methodologies that would be used to calculate the amount of Co2 sequestration. ',
      subSections: SectionAHelpContentData,
    },
  ],
}

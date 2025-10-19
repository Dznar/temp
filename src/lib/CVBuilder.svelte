<script lang="ts">
  import { onMount } from 'svelte';
  import CVPreview from './CVPreview.svelte';
  import type { CVData, Certificate, Project } from './types';

  let currentTemplate = 'photo-modern';
  let cvData: CVData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    photoUrl: '',
    experience: [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    education: [{
      degree: '',
      institution: '',
      year: ''
    }],
    skills: '',
    certificates: [],
    projects: []
  };

  let fileInput: HTMLInputElement;

  const templates = [
    { id: 'photo-modern', name: 'Photo Modern', desc: 'Professional sidebar with photo' },
    { id: 'photo-header', name: 'Photo Header', desc: 'Photo in header with clean layout' },
    { id: 'photo-circle', name: 'Photo Circle', desc: 'Circular photo with elegant design' },
    { id: 'photo-corner', name: 'Photo Corner', desc: 'Top corner photo with modern style' },
    { id: 'modern', name: 'Modern', desc: 'A sleek, contemporary design' },
    { id: 'classic', name: 'Classic', desc: 'A timeless, traditional layout' },
    { id: 'creative', name: 'Creative', desc: 'A unique, artistic style' },
    { id: 'minimal', name: 'Minimal', desc: 'A simple, clean format' },
    { id: 'executive', name: 'Executive', desc: 'A powerful, professional look' },
    { id: 'tech', name: 'Tech', desc: 'A design for the tech industry' },
    { id: 'elegant', name: 'Elegant', desc: 'A sophisticated, graceful style' },
    { id: 'compact', name: 'Compact', desc: 'A space-efficient design' },
    { id: 'clean', name: 'Clean', desc: 'A crisp, uncluttered layout' },
    { id: 'professional', name: 'Professional', desc: 'A sharp, business-focused look' },
    { id: 'monochrome', name: 'Monochrome', desc: 'A stylish black and white design' },
    { id: 'dark', name: 'Dark', desc: 'A bold, dark-themed resume' }
  ];

  function handlePhotoUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        cvData.photoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  function removePhoto() {
    cvData.photoUrl = '';
    if (fileInput) {
      fileInput.value = '';
    }
  }

  function addExperience() {
    cvData.experience = [...cvData.experience, {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }];
  }

  function removeExperience(index: number) {
    cvData.experience = cvData.experience.filter((_, i) => i !== index);
  }

  function addEducation() {
    cvData.education = [...cvData.education, {
      degree: '',
      institution: '',
      year: ''
    }];
  }

  function removeEducation(index: number) {
    cvData.education = cvData.education.filter((_, i) => i !== index);
  }

  function addCertificate() {
    cvData.certificates = [...cvData.certificates, {
      name: '',
      issuer: '',
      year: ''
    }];
  }

  function removeCertificate(index: number) {
    cvData.certificates = cvData.certificates.filter((_, i) => i !== index);
  }

  function addProject() {
    cvData.projects = [...cvData.projects, {
      name: '',
      description: '',
      url: ''
    }];
  }

  function removeProject(index: number) {
    cvData.projects = cvData.projects.filter((_, i) => i !== index);
  }

  function downloadCV() {
    window.print();
  }

  onMount(() => {
    // Load sample data
    cvData = {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      summary: 'Creative and results-driven professional with 8+ years of experience in digital marketing and brand strategy. Passionate about building meaningful connections between brands and their audiences.',
      photoUrl: '',
      experience: [
        {
          jobTitle: 'Senior Marketing Manager',
          company: 'Tech Innovations Inc.',
          startDate: '2021-06',
          endDate: '',
          description: 'Led marketing initiatives that increased brand awareness by 150%. Managed a team of 5 marketing professionals and oversaw campaigns with budgets exceeding $2M annually.'
        },
        {
          jobTitle: 'Marketing Specialist',
          company: 'Digital Solutions Co.',
          startDate: '2018-03',
          endDate: '2021-05',
          description: 'Developed and executed digital marketing strategies across multiple channels. Increased social media engagement by 200% and email open rates by 45%.'
        }
      ],
      education: [
        {
          degree: 'Master of Business Administration',
          institution: 'Stanford University',
          year: '2018'
        },
        {
          degree: 'Bachelor of Arts in Marketing',
          institution: 'UC Berkeley',
          year: '2015'
        }
      ],
      skills: 'Digital Marketing, Brand Strategy, Content Creation, Social Media Management, SEO/SEM, Google Analytics, Team Leadership, Budget Management',
      certificates: [
        {
          name: 'Certified Digital Marketing Professional',
          issuer: 'Digital Marketing Institute',
          year: '2020'
        }
      ],
      projects: [
        {
          name: 'Brand Refresh for a Non-Profit',
          description: 'Led a comprehensive brand refresh for a local non-profit, resulting in a 30% increase in online donations.',
          url: 'project-example.com'
        }
      ]
    };
  });
</script>

<div class="app">
  <header class="header">
    <div class="container">
      <h1 class="logo">CV Builder Pro</h1>
      <button class="btn btn-primary" on:click={downloadCV}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download CV
      </button>
    </div>
  </header>

  <main class="main-content">
    <div class="container">
      <section class="template-selector">
        <h2>Choose Your Template</h2>
        <div class="template-grid">
          {#each templates as template}
            <button
              class="template-card"
              class:active={currentTemplate === template.id}
              on:click={() => currentTemplate = template.id}
            >
              <div class="template-preview {template.id}">
                <div class="preview-header"></div>
                <div class="preview-body">
                  <div class="preview-main"></div>
                  <div class="preview-sidebar"></div>
                </div>
              </div>
              <h3>{template.name}</h3>
              <p>{template.desc}</p>
            </button>
          {/each}
        </div>
      </section>

      <div class="editor-layout">
        <div class="form-panel">
          <form on:submit|preventDefault>
            <section class="form-section">
              <h2>CV Editor</h2>
          <form on:submit|preventDefault>
            <section class="form-section">
              <h2>Photo</h2>
              <div class="photo-upload">
                {#if cvData.photoUrl}
                  <div class="photo-preview">
                    <img src={cvData.photoUrl} alt="Profile" />
                    <button type="button" class="remove-photo" on:click={removePhoto}>×</button>
                  </div>
                {:else}
                  <label class="photo-upload-btn">
                    <input
                      type="file"
                      accept="image/*"
                      bind:this={fileInput}
                      on:change={handlePhotoUpload}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span>Upload Photo</span>
                  </label>
                {/if}
              </div>
            </section>

            <section class="form-section">
              <h2>Personal Information</h2>
              <div class="form-grid">
                <div class="form-group">
                  <label for="fullName">Full Name</label>
                  <input type="text" id="fullName" bind:value={cvData.fullName} placeholder="John Doe" />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" bind:value={cvData.email} placeholder="john@example.com" />
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="tel" id="phone" bind:value={cvData.phone} placeholder="+1 (555) 123-4567" />
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input type="text" id="location" bind:value={cvData.location} placeholder="New York, NY" />
                </div>
                <div class="form-group full-width">
                  <label for="summary">Professional Summary</label>
                  <textarea id="summary" bind:value={cvData.summary} rows="3" placeholder="Brief overview..."></textarea>
                </div>
              </div>
            </section>

            <section class="form-section">
              <h2>Work Experience</h2>
              {#each cvData.experience as exp, index}
                <div class="array-item">
                  <div class="form-grid">
                    <div class="form-group">
                      <label>Job Title</label>
                      <input type="text" bind:value={exp.jobTitle} placeholder="Software Engineer" />
                    </div>
                    <div class="form-group">
                      <label>Company</label>
                      <input type="text" bind:value={exp.company} placeholder="Tech Corp" />
                    </div>
                    <div class="form-group">
                      <label>Start Date</label>
                      <input type="month" bind:value={exp.startDate} />
                    </div>
                    <div class="form-group">
                      <label>End Date</label>
                      <input type="month" bind:value={exp.endDate} placeholder="Present" />
                    </div>
                    <div class="form-group full-width">
                      <label>Description</label>
                      <textarea bind:value={exp.description} rows="3" placeholder="Key responsibilities..."></textarea>
                    </div>
                  </div>
                  {#if cvData.experience.length > 1}
                    <button type="button" class="remove-btn" on:click={() => removeExperience(index)}>Remove</button>
                  {/if}
                </div>
              {/each}
              <button type="button" class="btn btn-secondary" on:click={addExperience}>Add Experience</button>
            </section>

            <section class="form-section">
              <h2>Education</h2>
              {#each cvData.education as edu, index}
                <div class="array-item">
                  <div class="form-grid">
                    <div class="form-group">
                      <label>Degree</label>
                      <input type="text" bind:value={edu.degree} placeholder="Bachelor of Science" />
                    </div>
                    <div class="form-group">
                      <label>Institution</label>
                      <input type="text" bind:value={edu.institution} placeholder="University Name" />
                    </div>
                    <div class="form-group">
                      <label>Year</label>
                      <input type="text" bind:value={edu.year} placeholder="2023" />
                    </div>
                  </div>
                  {#if cvData.education.length > 1}
                    <button type="button" class="remove-btn" on:click={() => removeEducation(index)}>Remove</button>
                  {/if}
                </div>
              {/each}
              <button type="button" class="btn btn-secondary" on:click={addEducation}>Add Education</button>
            </section>

            <section class="form-section">
              <h2>Skills</h2>
              <div class="form-group">
                <label for="skills">Skills (comma-separated)</label>
                <textarea id="skills" bind:value={cvData.skills} rows="3" placeholder="JavaScript, React, Node.js..."></textarea>
              </div>
            </section>

            <section class="form-section">
              <h2>Certificates</h2>
              {#each cvData.certificates as cert, index}
                <div class="array-item">
                  <div class="form-grid">
                    <div class="form-group">
                      <label>Certificate Name</label>
                      <input type="text" bind:value={cert.name} placeholder="Certified Awesome Developer" />
                    </div>
                    <div class="form-group">
                      <label>Issuer</label>
                      <input type="text" bind:value={cert.issuer} placeholder="Certification Authority" />
                    </div>
                    <div class="form-group">
                      <label>Year</label>
                      <input type="text" bind:value={cert.year} placeholder="2023" />
                    </div>
                  </div>
                  <button type="button" class="remove-btn" on:click={() => removeCertificate(index)}>Remove</button>
                </div>
              {/each}
              <button type="button" class="btn btn-secondary" on:click={addCertificate}>Add Certificate</button>
            </section>

            <section class="form-section">
              <h2>Projects</h2>
              {#each cvData.projects as proj, index}
                <div class="array-item">
                  <div class="form-grid">
                    <div class="form-group">
                      <label>Project Name</label>
                      <input type="text" bind:value={proj.name} placeholder="My Awesome Project" />
                    </div>
                    <div class="form-group">
                      <label>Project URL</label>
                      <input type="text" bind:value={proj.url} placeholder="github.com/user/project" />
                    </div>
                    <div class="form-group full-width">
                      <label>Description</label>
                      <textarea bind:value={proj.description} rows="3" placeholder="A brief description of your project..."></textarea>
                    </div>
                  </div>
                  <button type="button" class="remove-btn" on:click={() => removeProject(index)}>Remove</button>
                </div>
              {/each}
              <button type="button" class="btn btn-secondary" on:click={addProject}>Add Project</button>
            </section>
          </form>
        </div>

        <div class="preview-panel">
          <div class="preview-header">
            <h3>Preview</h3>
            <button class="btn btn-outline" on:click={downloadCV}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 6,2 18,2 18,9"/>
                <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2,2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              Print
            </button>
          </div>
          <div class="cv-preview">
            <CVPreview {cvData} template={currentTemplate} />
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    min-height: 100vh;
    background: #f9fafb;
  }

  .header {
    background: white;
    border-bottom: 2px solid #e5e7eb;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
h2 {
  font-size: 1.2em;
  color: blue;
  line-height: 1.1;
}

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2563eb;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .btn-primary {
    background: #2563eb;
    color: white;
  }

  .btn-primary:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .btn-secondary:hover {
    background: #e5e7eb;
  }

  .btn-outline {
    background: transparent;
    color: #374151;
    border: 1px solid #d1d5db;
  }

  .btn-outline:hover {
    background: #f9fafb;
  }

  .main-content {
    padding: 2rem 0;
  }

  .template-selector {
    margin-bottom: 2rem;
  }

  .template-selector h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .template-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .template-card:hover {
    border-color: #2563eb;
    transform: translateY(-2px);
  }

  .template-card.active {
    border-color: #2563eb;
    background: #eff6ff;
  }

  .template-preview {
    height: 120px;
    border-radius: 0.5rem;
    margin-bottom: 0.75rem;
    background: #f3f4f6;
    position: relative;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }

  .preview-header {
    height: 15px;
    background: #d1d5db;
  }

  .preview-body {
    display: flex;
    height: calc(100% - 15px);
  }

  .preview-main {
    flex: 1;
    padding: 8px;
    background: #fff;
  }

  .preview-sidebar {
    width: 35%;
    background: #e5e7eb;
  }

  /* Template-specific preview styles */
  .photo-modern .preview-body {
    flex-direction: row-reverse;
  }
  .photo-modern .preview-sidebar {
    background: #9ca3af;
  }

  .photo-header .preview-header {
    height: 30px;
    background: #d1d5db;
    position: relative;
  }
  .photo-header .preview-header::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #9ca3af;
  }

  .photo-circle .preview-header {
      height: 40px;
  }
  .photo-circle .preview-header::after {
      width: 30px;
      height: 30px;
  }

  .photo-corner .preview-header::after {
      left: auto;
      right: 8px;
      top: 8px;
      width: 20px;
      height: 20px;
  }

  .modern .preview-body {
      flex-direction: row-reverse;
  }
  .modern .preview-sidebar {
      background: #f0f0f0;
  }
  .modern .preview-header {
      background: #a5d8ff;
  }

  .classic .preview-header {
      height: 20px;
      background: #f0e6d2;
  }
  .classic .preview-body {
      background: #fff;
  }

  .creative .preview-body {
      display: flex;
  }
  .creative .preview-main {
      flex: 60%;
  }
  .creative .preview-sidebar {
      flex: 40%;
      background: #a9a9a9;
  }

  .minimal .preview-header {
      height: 10px;
      background: #f5f5f5;
  }

  .executive .preview-header {
      background: #dadddc;
  }
  .executive .preview-body {
      flex-direction: row-reverse;
  }

  .tech .preview-header, .tech .preview-body {
      background: #333;
  }
  .tech .preview-main {
      background: #444;
  }
  .tech .preview-sidebar {
      background: #555;
  }

  .elegant .preview-header {
      background: #e3d9c6;
  }

  .compact .preview-header {
      height: 25px;
  }

  .professional .preview-body {
      display: flex;
  }
  .professional .preview-main {
      flex: 65%;
  }
  .professional .preview-sidebar {
      flex: 35%;
      background: #3d4c5a;
  }

  .monochrome .preview-header {
      border-bottom: 2px solid #000;
      background: #fff;
  }
  .monochrome .preview-body {
      background: #fff;
      border-top: 1px solid #ccc;
  }

  .dark {
      background: #2a2a2a;
  }
  .dark .preview-header {
      background: #4a4a4a;
  }
  .dark .preview-body {
      background: #3a3a3a;
  }
  .dark .preview-main {
      background: #2a2a2a;
  }
  .dark .preview-sidebar {
      background: #3a3a3a;
  }

  .template-card h3 {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .template-card p {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .editor-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }

  .form-panel {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .form-section {
    margin-bottom: 2rem;
  }

  .form-section h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .photo-upload {
    display: flex;
    justify-content: center;
  }

  .photo-preview {
    position: relative;
    width: 150px;
    height: 150px;
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .remove-photo {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo-upload-btn {
    width: 150px;
    height: 150px;
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    gap: 0.5rem;
  }

  .photo-upload-btn:hover {
    border-color: #2563eb;
    background: #eff6ff;
  }

  .photo-upload-btn input {
    display: none;
  }

  .photo-upload-btn svg {
    color: #6b7280;
  }

  .photo-upload-btn span {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group.full-width {
    grid-column: 1 / -1;
  }

  .form-group label {
    font-weight: 500;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .array-item {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
  }

  .remove-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    cursor: pointer;
  }

  .preview-panel {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: sticky;
    top: 6rem;
  }

  .preview-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .preview-header h3 {
    font-size: 1.125rem;
  }

  .cv-preview {
    padding: 1.5rem;
    min-height: 600px;
    max-height: 800px;
    overflow-y: auto;
  }

  @media (max-width: 1024px) {
    .editor-layout {
      grid-template-columns: 1fr;
    }

    .preview-panel {
      position: static;
      order: -1;
    }
  }

  @media print {
    .header,
    .template-selector,
    .form-panel,
    .preview-header {
      display: none !important;
    }

    .main-content,
    .container,
    .editor-layout,
    .preview-panel {
      padding: 0 !important;
      margin: 0 !important;
      box-shadow: none !important;
    }

    .cv-preview {
      max-height: none !important;
      overflow: visible !important;
    }
  }
</style>

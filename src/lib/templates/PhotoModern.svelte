<script lang="ts">
  import type { CVData } from '../types';
  export let cvData: CVData;

  const skills = cvData.skills.split(',').map(s => s.trim()).filter(s => s);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<div class="cv-template photo-modern">
  <div class="sidebar">
    {#if cvData.photoUrl}
      <div class="photo">
        <img src={cvData.photoUrl} alt={cvData.fullName} />
      </div>
    {/if}

    <div class="contact">
      <h2>Contact</h2>
      <div class="contact-item">{cvData.email || 'email@example.com'}</div>
      <div class="contact-item">{cvData.phone || '+1 (555) 123-4567'}</div>
      <div class="contact-item">{cvData.location || 'City, State'}</div>
    </div>

    {#if skills.length > 0}
      <div class="section">
        <h2>Skills</h2>
        <div class="skills">
          {#each skills as skill}
            <div class="skill-tag">{skill}</div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="main">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>

    {#if cvData.summary}
      <div class="section">
        <h2>Professional Summary</h2>
        <p>{cvData.summary}</p>
      </div>
    {/if}

    <div class="section">
      <h2>Experience</h2>
      {#each cvData.experience as exp}
        {#if exp.jobTitle || exp.company}
          <div class="entry">
            <div class="entry-header">
              <div>
                <h3>{exp.jobTitle || 'Job Title'}</h3>
                <div class="company">{exp.company || 'Company Name'}</div>
              </div>
              {#if exp.startDate}
                <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
              {/if}
            </div>
            {#if exp.description}
              <p class="description">{exp.description}</p>
            {/if}
          </div>
        {/if}
      {/each}
    </div>

    <div class="section">
      <h2>Education</h2>
      {#each cvData.education as edu}
        {#if edu.degree || edu.institution}
          <div class="entry">
            <div class="entry-header">
              <div>
                <h3>{edu.degree || 'Degree'}</h3>
                <div class="institution">{edu.institution || 'Institution'}</div>
              </div>
              {#if edu.year}
                <div class="date">{edu.year}</div>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>

    {#if cvData.certificates.length > 0}
      <div class="section">
        <h2>Certificates</h2>
        {#each cvData.certificates as cert}
          <div class="entry">
            <div class="entry-header">
              <h3>{cert.name}</h3>
              <div class="date">{cert.year}</div>
            </div>
            <div class="institution">{cert.issuer}</div>
          </div>
        {/each}
      </div>
    {/if}

    {#if cvData.projects.length > 0}
      <div class="section">
        <h2>Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <div class="entry-header">
              <h3>{proj.name}</h3>
            </div>
            {#if proj.url}
              <a href={proj.url} target="_blank">{proj.url}</a>
            {/if}
            <p class="description">{proj.description}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .cv-template {
    background: white;
    display: flex;
    min-height: 100%;
    font-size: 10pt;
    line-height: 1.4;
  }

  .sidebar {
    width: 35%;
    background: #1e40af;
    color: white;
    padding: 2rem 1.5rem;
  }

  .photo {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 3px solid white;
  }

  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .contact h2,
  .sidebar .section h2 {
    font-size: 12pt;
    margin-bottom: 0.75rem;
    border-bottom: 2px solid white;
    padding-bottom: 0.25rem;
  }

  .contact {
    margin-bottom: 1.5rem;
  }

  .contact-item {
    margin-bottom: 0.5rem;
    font-size: 9pt;
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .skill-tag {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.4rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 9pt;
  }

  .main {
    flex: 1;
    padding: 2rem 1.5rem;
  }

  .name {
    font-size: 24pt;
    font-weight: 700;
    color: #1e40af;
    margin-bottom: 1.5rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section h2 {
    font-size: 13pt;
    font-weight: 600;
    color: #1e40af;
    margin-bottom: 0.75rem;
    border-bottom: 2px solid #1e40af;
    padding-bottom: 0.25rem;
  }

  .section p {
    color: #4b5563;
    line-height: 1.5;
  }

  .entry {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .entry:last-child {
    border-bottom: none;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .entry h3 {
    font-size: 11pt;
    font-weight: 600;
    color: #1f2937;
  }

  .company,
  .institution {
    color: #6b7280;
    font-size: 10pt;
    font-weight: 500;
  }

  .date {
    color: #6b7280;
    font-size: 9pt;
    white-space: nowrap;
  }

  .description {
    margin-top: 0.5rem;
    color: #4b5563;
    font-size: 9pt;
  }

  @media print {
    .cv-template {
      min-height: 297mm;
    }

    .sidebar {
      background: #1e40af !important;
      color: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .photo {
      border-color: white !important;
    }

    .skill-tag {
      background: rgba(255, 255, 255, 0.2) !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>

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

<div class="cv-template photo-circle">
  <div class="header">
    {#if cvData.photoUrl}
      <div class="photo">
        <img src={cvData.photoUrl} alt={cvData.fullName} />
      </div>
    {/if}
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact">
      <div>{cvData.email || 'email@example.com'}</div>
      <div>{cvData.phone || '+1 (555) 123-4567'}</div>
      <div>{cvData.location || 'City, State'}</div>
    </div>
  </div>

  <div class="body">
    {#if cvData.summary}
      <div class="section">
        <h2>About Me</h2>
        <p class="summary">{cvData.summary}</p>
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
            <h3>{proj.name}</h3>
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
    min-height: 100%;
    font-size: 10pt;
    line-height: 1.4;
  }

  .header {
    text-align: center;
    padding: 2rem 2rem 1.5rem;
    position: relative;
  }

  .header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #be185d;
  }

  .photo {
    width: 120px;
    height: 120px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #be185d;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-size: 24pt;
    font-weight: 300;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .contact {
    color: #6b7280;
    font-size: 9pt;
  }

  .contact div {
    margin-bottom: 0.25rem;
  }

  .body {
    padding: 2rem;
  }

  .section {
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 1rem;
  }

  .section::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #be185d, transparent);
  }

  .section h2 {
    font-size: 13pt;
    font-weight: 400;
    color: #be185d;
    margin-bottom: 0.75rem;
  }

  .summary {
    font-style: italic;
    color: #4b5563;
    line-height: 1.5;
  }

  .section p {
    color: #4b5563;
    line-height: 1.5;
  }

  .entry {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #fce7f3;
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

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .skill-tag {
    background: #fdf2f8;
    color: #be185d;
    padding: 0.3rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 9pt;
    border: 1px solid #fce7f3;
  }

  @media print {
    .photo {
      border-color: #be185d !important;
    }

    .header::after {
      background: #be185d !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .section::before {
      background: linear-gradient(to bottom, #be185d, transparent) !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .skill-tag {
      background: #fdf2f8 !important;
      color: #be185d !important;
      border-color: #fce7f3 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>

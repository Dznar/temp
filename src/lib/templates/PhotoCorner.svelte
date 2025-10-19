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

<div class="cv-template photo-corner">
  <div class="header">
    <div class="header-content">
      <div>
        <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
        <div class="contact">
          <span>{cvData.email || 'email@example.com'}</span>
          <span>|</span>
          <span>{cvData.phone || '+1 (555) 123-4567'}</span>
          <span>|</span>
          <span>{cvData.location || 'City, State'}</span>
        </div>
      </div>
      {#if cvData.photoUrl}
        <div class="photo">
          <img src={cvData.photoUrl} alt={cvData.fullName} />
        </div>
      {/if}
    </div>
  </div>

  <div class="body">
    <div class="main-content">
      {#if cvData.summary}
        <div class="section">
          <h2>Profile</h2>
          <p>{cvData.summary}</p>
        </div>
      {/if}

      <div class="section">
        <h2>Professional Experience</h2>
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
    </div>

    <div class="sidebar-content">
      <div class="section">
        <h2>Education</h2>
        {#each cvData.education as edu}
          {#if edu.degree || edu.institution}
            <div class="entry-compact">
              <h3>{edu.degree || 'Degree'}</h3>
              <div class="institution">{edu.institution || 'Institution'}</div>
              {#if edu.year}
                <div class="year">{edu.year}</div>
              {/if}
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
            <div class="entry-compact">
              <h3>{cert.name}</h3>
              <div class="institution">{cert.issuer}</div>
              <div class="year">{cert.year}</div>
            </div>
          {/each}
        </div>
      {/if}

      {#if cvData.projects.length > 0}
        <div class="section">
          <h2>Projects</h2>
          {#each cvData.projects as proj}
            <div class="entry-compact">
              <h3>{proj.name}</h3>
              <p class="description">{proj.description}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
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
    background: #1f2937;
    color: white;
    padding: 1.5rem 2rem;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  .name {
    font-size: 24pt;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .contact {
    display: flex;
    gap: 0.75rem;
    font-size: 9pt;
    opacity: 0.95;
    flex-wrap: wrap;
  }

  .photo {
    width: 100px;
    height: 100px;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 3px solid #f59e0b;
    flex-shrink: 0;
  }

  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .body {
    padding: 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section h2 {
    font-size: 12pt;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.75rem;
    border-bottom: 2px solid #f59e0b;
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

  .company {
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

  .entry-compact {
    margin-bottom: 1rem;
  }

  .entry-compact h3 {
    font-size: 10pt;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  .institution {
    color: #6b7280;
    font-size: 9pt;
  }

  .year {
    color: #9ca3af;
    font-size: 8pt;
    margin-top: 0.25rem;
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .skill-tag {
    background: #fef3c7;
    color: #92400e;
    padding: 0.3rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 9pt;
  }

  @media print {
    .header {
      background: #1f2937 !important;
      color: white !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .photo {
      border-color: #f59e0b !important;
    }

    .section h2 {
      border-bottom-color: #f59e0b !important;
    }

    .skill-tag {
      background: #fef3c7 !important;
      color: #92400e !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
